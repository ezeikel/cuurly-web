const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const { isLoggedIn } = require('../utils');

cloudinary.config({
  cloud_name: 'crownd',
  api_key: '587685821236624',
  api_secret: 'xHtsSFHgmkRH1-4jT4Mjt1uosfg'
});

const processUpload = async ({ file, folder, tags }) => {
  const {
    stream,
    filename,
    mimetype,
    encoding
  } = await file;

  let resultUrl = '', resultSecureUrl = '', publicId = '';
  const cloudinaryUpload = async ({ stream }) => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.v2.uploader.upload_stream({folder, tags, overwrite: true}, function(error, result) {
          if (result) {
            resultUrl = result.url;
            resultSecureUrl = result.secure_url;
            publicId = result.public_id;
            resolve({ resultSecureUrl, publicId });
          } else {
            reject(error);
          }
        });

        stream.pipe(streamLoad);
      });
    } catch (err) {
      throw new Error(`Failed to upload profile picture ! Err:${err.message}`);
    }
  };

  await cloudinaryUpload({ stream });
  return({ resultUrl, resultSecureUrl, publicId });
}

const Mutations = {
  signup: async (_, args, ctx, info) => {
    // lowercase email
    args.email = args.email.toLowerCase();
    // hash password
    const password = await bcrypt.hash(args.password, 10);
    // create user in the db
    const user = await ctx.prisma.createUser({
      ...args,
      password,
    }, info);
    // create JWT token for user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // we set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // finally return user the the browser
    return user;
  },
  signin: async (_, { username, password }, ctx, info) => {
    // 1. check if there is a user with that email
    const user = await ctx.prisma.user({ username });
    if (!user) {
      throw new Error(`No such user found for username ${username}`);
    }
    // 2. check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password!');
    }
    // 3. generate the jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 5. return the user
    return user;
  },
  signout: (_, args, ctx, info) => {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
  follow: async (_, { id }, ctx, info) => {
    isLoggedIn(ctx);

    const followers = await ctx.prisma.user({ id }, info).followers();
    const followerIds = followers.map(follower => follower.id);

    if (followerIds.includes(ctx.request.userId)) {
      throw new Error(`You are already following ${id}`);
    }

    await ctx.prisma.updateUser({
      where: {
        id
      },
      data: {
        followers: {
          connect: { id: ctx.request.userId }
        }
      }
    });

    return await ctx.prisma.updateUser({
      where: {
        id: ctx.request.userId
      },
      data: {
        following: {
          connect: { id }
        }
      }
    });
  },
  unfollow: async (_, { id }, ctx, info) => {
    isLoggedIn(ctx);

    const followers = await ctx.prisma.user({ id }, info).followers();
    const followerIds = followers.map(follower => follower.id);

    if (!followerIds.includes(ctx.request.userId)) {
      throw new Error(`You are not following ${id}`);
    }

    await ctx.prisma.updateUser({
      where: {
        id
      },
      data: {
        followers: {
          disconnect: { id: ctx.request.userId }
        }
      }
    });

    return await ctx.prisma.updateUser({
      where: {
        id: ctx.request.userId
      },
      data: {
        following: {
          disconnect: { id }
        }
      }
    });

  },
  createPost: async (_, { file, caption }, ctx, info) => {
    isLoggedIn(ctx);

    const tags = ['user_post'];
    const folder = `uploads/users/${ctx.request.userId}`;
    const { resultSecureUrl, publicId } = await processUpload({ file, tags, folder });

    return ctx.prisma.createPost({
      author: {
        connect: {
          id: ctx.request.userId
        }
      },
      content: {
        create: {
          url: resultSecureUrl,
          publicId
        }
      },
      caption
    }, info);
  },
  deletePost: async (_, { id, publicId }, ctx, info) => {
    //isLoggedIn(ctx);

    // TODO: promisify this
    cloudinary.v2.api.delete_resources([publicId], (error, result) => {
      console.log(result);
    });

    return ctx.prisma.deletePost({ id }, info);
  },
  likePost: (_, { id }, ctx, info) => {
    isLoggedIn(ctx);

    // TODO: Add check to make sure a User cannot like a post more than once

    return ctx.prisma.createLike({
      user: {
        connect: {
          id: ctx.request.userId
        }
      },
      post: {
        connect: {
          id
        }
      }
    });
  },
  unlikePost: (_, { id }, ctx, info) => {
    isLoggedIn(ctx);

    return ctx.prisma.deleteLike({ id });
  },
  addComment: (_, { id, text }, ctx, info) => {
    isLoggedIn(ctx);

    return ctx.prisma.createComment({
      post: {
        connect: {
          id
        }
      },
      text,
      writtenBy: {
        connect: {
          id: ctx.request.userId
        }
      }
    })
  },
  deleteComment: (_, { id }, ctx, info) => {
    isLoggedIn(ctx);

    return ctx.prisma.deleteComment({ id });
  },
};

module.exports = Mutations;

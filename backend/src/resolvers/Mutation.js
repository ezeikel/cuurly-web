const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isLoggedIn } = require('../utils');

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
  createPost: (_, args, ctx, info) => {
    isLoggedIn(ctx);

    return ctx.prisma.createPost({
      author: {
        connect: {
          id: ctx.request.userId
        }
      },
      ...args
    }, info);
  },
  likePost: (_, { id }, ctx, info) => {
    isLoggedIn(ctx);

    // TODO: Add code to make sure a User cannot like a post more than once

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
  }
};

module.exports = Mutations;

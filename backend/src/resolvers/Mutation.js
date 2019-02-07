const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  createDraft(_, args, ctx) {
    return ctx.prisma.createPost(
      {
        title: args.title,
        author: {
          connect: { id: args.userId }
        }
      },

    )
  },
  publish(_, args, ctx) {
    return ctx.prisma.updatePost(
      {
        where: { id: args.postId },
        data: { published: true },
      },

    )
  },
  createUser(_, args, ctx) {
    return ctx.prisma.createUser({
      ...args,
      permissions: { set: ['USER'] }
    });
  },
  async signup(_, args, ctx, info) {
    // lowercase email
    args.email = args.email.toLowerCase();
    // hash password
    const password = await bcrypt.hash(args.password, 10);
    // create user in the db
    const user = await ctx.prisma.createUser({
      ...args,
      password,
      permissions: { set: ['USER'] }
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
};

module.exports = Mutations;

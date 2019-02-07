const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  // TODO: Remove these
  // createDraft(_, args, ctx) {
  //   return ctx.prisma.createPost(
  //     {
  //       title: args.title,
  //       author: {
  //         connect: { id: args.userId }
  //       }
  //     },

  //   )
  // },
  // publish(_, args, ctx) {
  //   return ctx.prisma.updatePost(
  //     {
  //       where: { id: args.postId },
  //       data: { published: true },
  //     },

  //   )
  // },
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
  async signin(_, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.prisma.user({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
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
  signout(_, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
};

module.exports = Mutations;

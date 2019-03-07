const { hasPermission } = require('../utils');

const Query = {
  currentUser: (_, args, ctx, info) => {
    // check if there is current userId
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.prisma.user({
      id: ctx.request.userId
    }, info);
  },
  users: (_, args, ctx, info) => {
    // 1. check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in.');
    }

    // 2. check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPATE']);

    // 3. if they do, query all the users
    return ctx.prisma.users({}, info);
  },
  user: (_, { id }, ctx, info) => ctx.prisma.user(({ id }), info),
  posts: (_, args, ctx, info) => ctx.prisma.posts({}, info)
}

module.exports = Query;

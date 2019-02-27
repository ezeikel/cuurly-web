const { hasPermission } = require('../utils');

const Query = {
  async users(_, args, ctx, info) {
    // 1. check if they are logged in

    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPATE']);

    // 3. if they do, query all the users
    return ctx.prisma.users({}, info);
  },
  async userz (_, args, ctx, info) {
    return ctx.prisma.users({}, info);
  },
  user (_, { id }, ctx, info) {
    return ctx.prisma.user({ id: id }, info);
  }
}

module.exports = Query;

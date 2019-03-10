const { isLoggedIn, hasPermission } = require('../utils');

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
    isLoggedIn(ctx);

    // 2. check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPATE']);

    // 3. if they do, query all the users
    return ctx.prisma.users({}, info);
  },
  user: (_, { id }, ctx, info) => ctx.prisma.user(({ id }), info),
  userz: (_, args, ctx, info) => ctx.prisma.users({}, info),
  posts: (_, args, ctx, info) => ctx.prisma.posts({}, info),
  feed: async (_, { id }, ctx, info) => {
    const following = await ctx.prisma.user({ id }, info).following();
    const followingIds = following.map(follower => follower.id);

    return ctx.prisma.posts(
      {
        where: {
          author: { id_in: followingIds }
        },
        orderBy: "createdAt_DESC"
      },
      info
    );
  }
}

module.exports = Query;

const { isLoggedIn, hasPermission } = require('../utils');

const Query = {
  currentUser: (_, args, ctx, info) => {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.prisma.user({
      id: ctx.request.userId
    }, info);
  },
  users: (_, { where }, ctx, info) => {
    isLoggedIn(ctx);

    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPATE']);

    // just filtering on username for now until OR is added back for mongo connector - https://github.com/prisma/prisma/issues/3897

    return ctx.prisma.users({ where }, info);
  },
  user: (_, { id }, ctx, info) => ctx.prisma.user(({ id }), info),
  userz: (_, args, ctx, info) => ctx.prisma.users({}, info),
  posts: (_, args, ctx, info) => ctx.prisma.posts({}, info),
  post: (_, { id }, ctx, info) => ctx.prisma.post({ id }, info),
  feed: async (_, { id }, ctx, info) => {
    const following = await ctx.prisma.user({ id }, info).following();
    const followingIds = following.map(follower => follower.id);

    return ctx.prisma.posts(
      {
        where: {
          author: { id_in: [...followingIds, ctx.request.userId] }
        },
        orderBy: "createdAt_DESC", // TODO: orderBy doesn't seem to be having any effect
      },
      info
    );
  },
  likedPosts: async (_, { id }, ctx, info) => {
    return ctx.prisma.posts(
      {
        where: {
          likes_every: { id: id }
        },
        orderBy: "createdAt_DESC", // TODO: orderBy doesn't seem to be having any effect
      },
      info
    );
  }
}

module.exports = Query;

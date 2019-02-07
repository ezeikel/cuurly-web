const Mutations = {
  createDraft(_, args, context) {
    return context.prisma.createPost(
      {
        title: args.title,
        author: {
          connect: { id: args.userId }
        }
      },

    )
  },
  publish(_, args, context) {
    return context.prisma.updatePost(
      {
        where: { id: args.postId },
        data: { published: true },
      },

    )
  },
  createUser(_, args, context) {
    return context.prisma.createUser({
      ...args,
      permissions: { set: ['USER'] }
    });
  }
};

module.exports = Mutations;

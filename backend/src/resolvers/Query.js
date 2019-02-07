const Query = {
  publishedPosts(_, args, context) {
    return context.prisma.posts({ where: { published: true } })
  },
  post(_, args, context) {
    return context.prisma.post({ id: args.postId })
  },
  postsByUser(_, args, context) {
    return context.prisma.user({
      id: args.userId
    }).posts()
  }
}

module.exports = Query;

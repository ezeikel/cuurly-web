const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const { prisma } = require('./generated/prisma-client');

// Create the GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
      User: {
        posts: parent => prisma.user({ id: parent.id }).posts(),
        following: parent => prisma.user({ id: parent.id }).following(),
        followers: parent => prisma.user({ id: parent.id }).followers(),
        likes: parent => prisma.user({ id: parent.id }).likes()
      },
      Post: {
        author: parent => prisma.post({ id: parent.id }).author(),
        likes: parent => prisma.post({ id: parent.id }).likes(),
        comments: parent => prisma.post({ id: parent.id }).comments()
      },
      Like: {
        user: parent => prisma.like({ id: parent.id }).user(),
        post: parent => prisma.like({ id: parent.id }).post()
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, prisma})
  });
}

module.exports = createServer;

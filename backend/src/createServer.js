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
        posts(parent) {
          return prisma.user({ id: parent.id }).posts()
        }
      },
      Post: {
        author(parent) {
          return prisma.post({ id: parent.id }).author()
        }
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, prisma})
  });
}

module.exports = createServer;

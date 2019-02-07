const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const { prisma } = require('./generated/prisma-client')

// const resolvers = {
//   User: {
//     posts(root, args, context) {
//       return context.prisma.user({
//         id: root.id
//       }).posts()
//     }
//   },
//   Post: {
//     author(root, args, context) {
//       return context.prisma.post({
//         id: root.id
//       }).author()
//     }
//   }
// }

// Create the GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, prisma})
  });
}

module.exports = createServer;

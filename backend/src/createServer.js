const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');

// Create the GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
      Date: new GraphQLScalarType({ // https://www.apollographql.com/docs/apollo-server/features/scalars-enums.html#custom-scalars
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
          return new Date(value); // value from the client
        },
        serialize(value) {
          return new Date(value).getTime(); // value sent to the client
        },
        parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
          }
          return null;
        },
      }),
      User: {
        posts: parent => prisma.user({ id: parent.id }).posts(),
        following: parent => prisma.user({ id: parent.id }).following(),
        followers: parent => prisma.user({ id: parent.id }).followers(),
        likes: parent => prisma.user({ id: parent.id }).likes(),
        comments: parent => prisma.user({ id: parent.id }).comments(),
        profilePicture: parent => prisma.user({ id: parent.id }).profilePicture()
      },
      Post: {
        author: parent => prisma.post({ id: parent.id }).author(),
        likes: parent => prisma.post({ id: parent.id }).likes(),
        comments: parent => prisma.post({ id: parent.id }).comments(),
        content: parent => prisma.post({ id: parent.id }).content()
      },
      Like: {
        user: parent => prisma.like({ id: parent.id }).user(),
        post: parent => prisma.like({ id: parent.id }).post()
      },
      Comment: {
        writtenBy: parent => prisma.comment({ id: parent.id }).writtenBy()
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, prisma})
  });
}

module.exports = createServer;

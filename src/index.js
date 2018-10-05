const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed
  }
  
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
      requireResolversForResolveType: false
  },
  context: req => ({
      ...req,
      db: new Prisma ({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'http://localhost:4466/waterbar/dev',
          secret: 'mysecret123456',
          debug: true
      })
  })
})

const serverOptions = {
    port: 4001,
}

server.start( serverOptions, ( {port} ) => 
        console.log(`App server is running on http://localhost:${port}`)
)


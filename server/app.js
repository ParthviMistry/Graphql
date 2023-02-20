const port = process.env.PORT || 4000;
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config()

const { typeDefs } = require('./schema/schema');
const { resolvers } = require('./resolver/resolvers');
//MONGODB_URL=mongodb://localhost:27017/GraphqlDemo
//MONGODB_URL=mongodb+srv://GraphqlDemo:test123@cluster0.vu9mj.mongodb.net/?retryWrites=true&w=majority

const server = new ApolloServer({
   typeDefs,
   resolvers
});

server.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);

mongoose
	.connect(process.env.MONGODB_URL, {
      ssl: true,
      sslValidate: false
    })
	.then(() => console.log('Application connected to MongoDB'))
	.catch((err) => console.log('error connecting to MongoDB', err));

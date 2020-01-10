const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const {MONGOURI} = require('./config');

const PORT = process.env.port || 4000;

const resolvers = require('./queries/resolvers');
const typeDefs = require('./queries/typeDefs');

const server = new ApolloServer({   //Express
	typeDefs,
	resolvers,
	context: ({req}) => ({req})
});

mongoose.connect(MONGOURI, {useNewUrlParser: true, useFindAndModify: false })
	.then(() => {
		console.log("connected to DB");
		server.listen({port: PORT});
	})
	.then(res => {
		console.log('Server running...');
	})
	.catch(err => {
		console.error(err);
	});

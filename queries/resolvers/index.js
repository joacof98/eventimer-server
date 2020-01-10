const eventResolvers = require('./events.js');
const userResolvers = require('./users.js');

module.exports = {
	Query: {
		...eventResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation,
		...eventResolvers.Mutation
	}
}
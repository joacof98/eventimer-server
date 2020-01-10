const {gql} = require('apollo-server');

module.exports = gql`
	type Event{
		id: ID!
		title: String!
		body: String!
		createdAt: String!
		finish: String!
		username: String!
	}

	type User{
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}

	input RegisterInput{
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	
	type Query{
		getEvents(username: String!) : [Event]
		getEvent(eventId: ID!) : Event
	}

	type Mutation{
		register(registerInput: RegisterInput) : User!
		login(username: String!, password: String!) : User!

		createEvent(title: String!, body: String!, finish: String!) : Event!
		deleteEvent(eventId: ID!) : String!
		updateEvent(eventId: ID!, title: String!, body: String!, finish: String!) : Event! 
	}

`
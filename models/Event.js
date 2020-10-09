const { model, Schema } = require('mongoose');

const EventSchema = new Schema({
	title: String,
	body: String,
	createdAt: String,
	finish: String,
	username: String
});

module.exports = model('Event', EventSchema);

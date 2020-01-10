const Event = require('../../models/Event');
const checkAuth = require('../../util/checkAuth');
const {AuthenticationError} = require('apollo-server');

module.exports = {
	Query: {
		async getEvents(_,{username}) {
			try{
				const events = await Event.find({username}).sort({createdAt: -1});
				return events;
			} catch(err){
				console.log(err);
			}
		},
		async getEvent(_,eventId) {
			try{
				const event = Event.findById(eventId);
				if(event){
					return event;
				} else {
					throw new Error('Event not found');
				}
			} catch(err) {
				console.log(err);
			}
		}	
	},
	Mutation: {
		async createEvent(_, {title,body,finish}, context) {
			const user = checkAuth(context);

			if(title.trim() === ""){
				throw new Error("El titulo no puede ser vacío");
			} else if(body.trim() === ""){
				throw new Error("La descripcion no puede ser vacía");
			} else if(finish.trim() === ""){
				throw new Error("Debes especificar fecha y hora del evento");
			}

			const newEvent = new Event({
				title,
				body,
				finish,
				createdAt: new Date().toISOString(),
				username: user.username
			});

			return newEvent.save();
		},
		async deleteEvent(_, {eventId}, context){
			const user = checkAuth(context);
			try{	
				const event = await Event.findById(eventId);
				if(user.username === event.username) {
					await event.delete();
					return "Event deleted!";
				} else {
					throw new AuthenticationError('Action not allowed >:(');
				}
			} catch(err) {
				throw new Error(err);
			}
		},
		async updateEvent(_, {eventId,title,body,finish}, context){
			const user = checkAuth(context);
			try{
				if(title.trim() === "" || body.trim() === "" || finish.trim() === "") {
					throw new Error("All fields must not be empty!");
				}

				const updatedEvent = {
					title,
					body,
					finish
				}
				
				await Event.findByIdAndUpdate(eventId, updatedEvent);
				//return event;
				return Event.findById(eventId);
			} catch(err) {
				throw new Error(err);
			}
		}
	}
}
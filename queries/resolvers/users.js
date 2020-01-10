const User = require('../../models/User');
const {SECRET_KEY} = require('../../config');
const {UserInputError} = require('apollo-server');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {validateLoginInput} = require('../../util/validators');
const {validateRegisterInput} = require('../../util/validators');

function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username
		},
		SECRET_KEY,
		{expiresIn: '4h'}
	);
}

module.exports = {
	Mutation: {
		async login(_, {username,password}) {
			const {errors,valid} = validateLoginInput(username,password);
			if(!valid){
				throw new UserInputError('Errors',{errors});
			}

			const user = await User.findOne({username});
			//Err of db
			if(!user) {
				errors.general = 'Usuario no encontrado';
				throw new UserInputError('Usuario no encontrado', {errors});
			}

			const match = await bcrypt.compare(password,user.password);
			if(!match) {
				errors.general = 'Usuario o contraseña incorrectos';
				throw new UserInputError('Usuario o contraseña incorrectos', {errors});
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token
			}
		},
		async register(_,{registerInput: {username, email, password, confirmPassword}}) {
			const {errors,valid} = validateRegisterInput(username,email,password,confirmPassword);
			if(!valid){
				throw new UserInputError('Errors',{errors});
			}

			const user = await User.findOne({username});
			if(user){
				throw new UserInputError('Username taken',{
					errors: {
						username: 'El usuario ya existe'
					}
				});
			}

			password = await bcrypt.hash(password,12);

			const newUser = new User({
				username,
				password,
				email,
				createdAt: new Date().toISOString()
			});

			const res = await newUser.save();
			const token = generateToken(res);

			return{
				...res._doc,
				id: res._id,
				token
			}
		}
	}
}

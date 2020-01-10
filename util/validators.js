module.exports.validateLoginInput = (username,password) => {
	const errors = {};
	if(username.trim() === ""){
		errors.username = "El campo usuario no puede ser vacío"        
	}
	if(password.trim() === ""){
		errors.password = "El campo contraseña no puede ser vacío"
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1
	}
}

module.exports.validateRegisterInput = (username,email,password,confirmPassword) => {
	const errors = {};
	if(username.trim() === ""){
		errors.username = "El campo usuario no puede ser vacío"
	}

	if(email.trim() === ""){
		errors.email = "El campo email no puede ser vacío"
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

		if(!email.match(regEx)){
			errors.email = "El email debe tener formato correcto"
		}
	}

	if(password.trim() === ""){
		errors.password = "El campo contraseña no puede ser vacío"
	} else if(password !== confirmPassword) {
		errors.confirmPassword = "Las contraseñas deben coincidir"
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1
	}
}
// Validation
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
	let joiSchema = {
		name: Joi.string().min(6).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required()
	};
	return Joi.validate(data, joiSchema);
};

const loginValidation = (data) => {
	let joiSchema = {
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required()
	};
	return Joi.validate(data, joiSchema);
};

module.exports = { registerValidation, loginValidation };

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../utils/validation');

router.post('/register', async (req, res) => {
	let { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('Email already exists');

	// hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});
	try {
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	let { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const userExist = await User.findOne({ email: req.body.email });
	if (!userExist) return res.status(400).send("A user with that email doesn't exist");

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Invalid Password');

	//Create and assign token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token);
	res.send('Logged In!');
});

module.exports = router;

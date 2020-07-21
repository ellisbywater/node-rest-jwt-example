const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const authRoute = require('./routes/auth');
// connect to mongo
mongoose.connect(
	`mongodb+srv://ebwx:${process.env.DB_PASSWORD}@apidev-gevmo.azure.mongodb.net/${process.env
		.DB_NAME}?retryWrites=true&w=majority`,
	{ useNewUrlParser: true },
	() => console.log(`Successfully connected to || ${process.env.DB_NAME}`)
);

// middlewares
app.use(express.json());

app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server up and running'));

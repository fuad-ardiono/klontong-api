import express from 'express'
import * as dotEnv from 'dotenv'
import bodyParser from 'body-parser'

import AuthModule from './module/auth/authModule.js';
import { ErrorHandler } from './handler/errorHandler.js';

dotEnv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

new AuthModule(app).initModule()

app.use(ErrorHandler)

app.listen(port, "0.0.0.0", (error) => {
	if (error) {
		console.error(error);
	} else {
		console.log(
			"Successfully connected to the server at 'http://localhost:3000/'"
		);
	}
});
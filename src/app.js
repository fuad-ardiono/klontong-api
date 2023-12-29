import express from 'express'
import * as dotEnv from 'dotenv'

dotEnv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`Hello World! ${JSON.stringify(process.env)}`)
})

app.listen(port, "0.0.0.0", (error) => {
	if (error) {
		console.error(error);
	} else {
		console.log(
			"Successfully connected to the server at 'http://localhost:3000/'"
		);
	}
});
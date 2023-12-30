import express from 'express'
import * as dotEnv from 'dotenv'
import bodyParser from 'body-parser'

import errorFilter from './filter/errorFilter.js';
import corsHeaderFilter from './filter/corsHeaderFilter.js';

import AuthModule from './module/auth/authModule.js';
import MarketPlaceModule from './module/marketplace/marketPlaceModule.js';
import ProductModule from './module/product/productModule.js';

dotEnv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(corsHeaderFilter);

app.use('/storage', express.static('storage'))

new AuthModule(app).initModule()
new MarketPlaceModule(app).initModule()
new ProductModule(app).initModule()

app.use(errorFilter)

app.listen(port, "0.0.0.0", (error) => {
	if (error) {
		console.error(error);
	} else {
		console.log(
			"Successfully connected to the server at 'http://localhost:3000/'"
		);
	}
});
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { existsSync, mkdirSync } = require("fs");
const { IMAGE_DIRECTORY, PORT } = require("./config/constants");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes");
app.use(routes);

//create a folder to save images if doesn't exist
if (!existsSync(IMAGE_DIRECTORY)) {
	mkdirSync(IMAGE_DIRECTORY);
}

module.exports = app.listen(PORT, () => {
	console.log("service listening on port", PORT);
});

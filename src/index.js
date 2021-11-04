require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./controllers/routes");
const app = express();
const mongo = require("./db/conn");
const port = process.env.PORT || 5000;
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongo();

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

app.use("/api/v1/cards", routes.default.cards);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("./client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname + "/../client/build/index.html"));
	});
}

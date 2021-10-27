"use strict";

require("dotenv").config();

const express = require("express");

const cors = require("cors");

const routes = require("./controllers/routes");

const app = express();

const mongo = require("./db/conn");

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
mongo();
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}

app.use("/api/v1/cards", routes.default.cards);
//# sourceMappingURL=index.js.map
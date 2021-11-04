"use strict";

const mongoose = require("mongoose");

require("dotenv").config();

module.exports = async () => {
  await mongoose.connect(process.env.dbUrl, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  }).catch(err => {
    console.error("Error connecting to mongo", err);
  });
  return mongoose;
};
//# sourceMappingURL=conn.js.map
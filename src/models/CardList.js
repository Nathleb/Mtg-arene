const mongoose = require("mongoose");
mongoose.set("debug", true);

const cardListSchema = new mongoose.Schema({
	_id: {
		type: "ObjectId",
	},
	cards_ids: {
		type: ["String"],
	},
	size: {
		type: "Number",
	},
});

const CardList = mongoose.model("cardlist", cardListSchema);

module.exports = CardList;

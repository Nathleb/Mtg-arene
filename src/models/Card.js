const mongoose = require("mongoose");
var random = require("mongoose-simple-random");

const cardSchema = new mongoose.Schema({
	_id: {
		$oid: {
			type: "ObjectId",
		},
	},
	object: {
		type: "String",
	},
	id: {
		type: "String",
	},
	oracle_id: {
		type: "String",
	},
	name: {
		type: "String",
	},
	lang: {
		type: "String",
	},
	released_at: {
		type: "Date",
	},
	uri: {
		type: "String",
	},
	scryfall_uri: {
		type: "String",
	},
	layout: {
		type: "String",
	},
	highres_image: {
		type: "Boolean",
	},
	image_status: {
		type: "String",
	},
	image_uris: {
		small: {
			type: "String",
		},
		normal: {
			type: "String",
		},
		large: {
			type: "String",
		},
		png: {
			type: "String",
		},
		art_crop: {
			type: "String",
		},
		border_crop: {
			type: "String",
		},
	},
	mana_cost: {
		type: "String",
	},
	cmc: {
		$numberDouble: {
			type: "String",
		},
	},
	type_line: {
		type: "String",
	},
	oracle_text: {
		type: "String",
	},
	colors: {
		type: "Array",
	},
	color_identity: {
		type: "Array",
	},
	keywords: {
		type: "Array",
	},
	set_id: {
		type: "String",
	},
	set: {
		type: "String",
	},
	set_name: {
		type: "String",
	},
	set_type: {
		type: "String",
	},
	rulings_uri: {
		type: "String",
	},
	prints_search_uri: {
		type: "String",
	},
	collector_number: {
		type: "String",
	},
	rarity: {
		type: "String",
	},
	flavor_text: {
		type: "String",
	},
	artist: {
		type: "String",
	},
	artist_ids: {
		type: ["String"],
	},
	illustration_id: {
		type: "String",
	},
	frame: {
		type: "Date",
	},
	booster: {
		type: "Boolean",
	},
	edhrec_rank: {
		$numberInt: {
			type: "Date",
		},
	},
	related_uris: {
		gatherer: {
			type: "String",
		},
		tcgplayer_infinite_articles: {
			type: "String",
		},
		tcgplayer_infinite_decks: {
			type: "String",
		},
		edhrec: {
			type: "String",
		},
		mtgtop8: {
			type: "String",
		},
	},
	total_picked: {
		$numberInt: {
			type: "String",
		},
	},
	total_proposed: {
		$numberInt: {
			type: "String",
		},
	},
});

cardSchema.plugin(random);

const Card = mongoose.model("card", cardSchema);

module.exports = Card;

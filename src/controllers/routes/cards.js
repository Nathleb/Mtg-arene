const express = require("express");
const router = express.Router();
const Cards = require("../../models/Card.js");
const parser = require("../../queryparsers/parsers.js");

router.get("/", async (req, res) => {
	Cards.findById(req.query.id, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

router.get("/random/", async (req, res) => {
	let query = {};
	try {
		if (req.query.colorId)
			query = { ...query, ...parser.parseColorId(req.query.colorId) };
		if (req.query.type)
			query = { ...query, ...parser.parseType(req.query.type) };
		if (req.query.cmc)
			query = { ...query, ...parser.parseCmc(req.query.cmc) };
		if (req.query.edhr)
			query = { ...query, ...parser.parseEdhrecRank(req.query.edhr) };
		Cards.findRandom(
			query,
			{},
			{ limit: req.query.limit },
			function (err, result) {
				if (err) throw err;
				res.send(result);
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
});

router.patch("/pick/:id", async (req, res) => {
	let filter = {};
	if (req.query.picked === "true") {
		filter = { $inc: { total_proposed: 1, total_picked: 1 } };
	} else if (req.query.picked === "false")
		filter = { $inc: { total_proposed: 1 } };
	// if (req.query.reset === "true")
	// 	filter = { total_proposed: 0, total_picked: 0 };
	Cards.findByIdAndUpdate(req.params.id, filter, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

module.exports = router;

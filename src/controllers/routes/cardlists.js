const express = require("express");
const router = express.Router();
const CardLists = require("../../models/CardList.js");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
	try {
		CardLists.find({}, (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "Something went wrong" + err });
	}
});

router.get("/:id", async (req, res) => {
	try {
		CardLists.findById(req.params.id, (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "Something went wrong" + err });
	}
});

router.put("/:id/cardId/:cardId", async (req, res) => {
	try {
		CardLists.findByIdAndUpdate(
			req.params.id,
			{ $push: { cards_ids: req.params.cardId }, $inc: { size: 1 } },
			(err, model) => {
				if (err) throw err;
				res.send(model);
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "Something went wrong" + err });
	}
});

router.post("/cardid/:card", async (req, res) => {
	try {
		let _id = mongoose.mongo.ObjectId();
		
		CardLists.create(
			{
				_id: _id,
				size: 1,
				cards_ids: [req.params.card],
			},
			(err, model) => {
				if (err) throw err;
				res.send(model);
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "Something went wrong" + err });
	}
});

// router.delete("/:id", async (req, res) => {
// 	try {
// 		CardLists.findByIdAndDelete(req.params.id, (err, model) => {
// 			if (err) throw err;
// 			res.send(model);
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(400).json({ error: "Something went wrong" + err });
// 	}
// });

router.delete("/all", async (req, res) => {
	try {
		CardLists.deleteMany({}, (err, model) => {
			if (err) throw err;
			res.send(model);
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "Something went wrong" + err });
	}
});

module.exports = router;

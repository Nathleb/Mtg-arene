module.exports = {
	parseColorId: function (colorId) {
		let query = {};
		switch (true) {
			case /^lte/.test(colorId):
				query = {
					$or: [
						{ color_identity: { $in: colorId.slice(3).split("") } },
						{ color_identity: { $size: 0 } },
					],
				};
				break;
			case /^lt/.test(colorId):
				query = {
					$or: [
						{
							color_identity: {
								$in: colorId.slice(2).split(""),
							},
							$expr: {
								$lt: [
									{ $size: "$color_identity" },
									colorId.slice(2).split("").length,
								],
							},
						},
						{ color_identity: { $size: 0 } },
					],
				};
				break;
			case /^gte/.test(colorId):
				query = {
					color_identity: { $all: colorId.slice(3).split("") },
				};
				break;
			case /^gt/.test(colorId):
				query = {
					color_identity: {
						$all: colorId.slice(2).split(""),
					},
					$expr: {
						$gt: [
							{ $size: "$color_identity" },
							colorId.slice(2).split("").length,
						],
					},
				};
				break;
			case colorId === "c":
				query = {
					color_identity: { $size: 0 },
				};
				break;
			default:
				query = {
					color_identity: {
						$size: colorId.split("").length,
						$all: colorId.split(""),
					},
				};
				break;
		}
		return query;
	},

	parseType: function (types) {
		let regexTypesArray = types.split(" ").reduce((acc, cur) => {
			acc.push(new RegExp(cur, "i"));
			return acc;
		}, []);
		let query = {
			type_line: {
				$all: regexTypesArray,
			},
		};
		return query;
	},

	parseCmc: function (cmc) {
		let query;
		switch (true) {
			case /^lte/.test(cmc):
				query = {
					cmc: { $lte: parseInt(cmc.slice(3), 10) },
				};
				break;
			case /^lt/.test(cmc):
				query = {
					cmc: { $lt: parseInt(cmc.slice(2), 10) },
				};
				break;
			case /^gte/.test(cmc):
				query = {
					cmc: { $gte: parseInt(cmc.slice(3), 10) },
				};
				break;
			case /^gt/.test(cmc):
				query = {
					cmc: { $gt: parseInt(cmc.slice(2), 10) },
				};
				break;
			default:
				query = {
					cmc: parseInt(cmc, 10),
				};
				break;
		}
		return query;
	},

	parseEdhrecRank: function (edhrecRank) {
		let query;
		switch (true) {
			case /^lte/.test(edhrecRank):
				query = {
					edhrec_rank: { $lte: parseInt(edhrecRank.slice(3), 10) },
				};
				break;
			case /^lt/.test(edhrecRank):
				query = {
					edhrec_rank: { $lt: parseInt(edhrecRank.slice(2), 10) },
				};
				break;
			case /^gte/.test(edhrecRank):
				query = {
					edhrec_rank: { $gte: parseInt(edhrecRank.slice(3), 10) },
				};
				break;
			case /^gt/.test(edhrecRank):
				query = {
					edhrec_rank: { $gt: parseInt(edhrecRank.slice(2), 10) },
				};
				break;
			default:
				query = {
					edhrec_rank: parseInt(edhrecRank, 10),
				};
				break;
		}
		return query;
	},

	// parsePickrate: function (pickrate) {

	// },
};

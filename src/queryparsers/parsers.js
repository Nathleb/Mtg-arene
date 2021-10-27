module.exports = {
	parseColorId: function (colorId) {
		let query = {};
		if (!colorId) return { color_identity: { exists: true } };
		switch (true) {
			case /^lte/.test(colorId):
				query = {
					$or: [
						{
							color_identity: {
								$not: {
									$elemMatch: {
										$nin: colorId.slice(3).split(""),
									},
								},
							},
						},
						{ color_identity: { $size: 0 } },
					],
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
		if (!types) return { type_line: { exists: true } };
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
		if (!cmc) return { cmc: { exists: true } };
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
		if (!edhrecRank) return {};
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
};

import React, { Component } from "react";
import axios from "axios";

class CardSelector extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			type: props.type,
			colorId: props.colorId,
			cmc: props.cmc,
			limit: parseInt(props.limit, 10),
			pick: "Leader",
			commander: [],
			cards: [],
			list: {},
			sideboard: [],
			basiclands: {
				plains: 0,
				forest: 0,
				swamp: 0,
				island: 0,
				mountain: 0,
			},
			nbrPick: 45,
			enabled: true,
		};
		this.addToSideBoard = this.addToSideBoard.bind(this);
		this.addToDecklistFromCardSelector =
			this.addToDecklistFromCardSelector.bind(this);
		this.downloadList = this.downloadList.bind(this);
		this.handleCounterChange = this.handleCounterChange.bind(this);
	}

	/* Make the first request to the API*/
	componentDidMount() {
		this._isMounted = true;
		axios
			.get(
				`https://mtgpickr.herokuapp.com/api/v1/cards/random?limit=${this.state.limit}&type=${this.state.type}&colorId=lte${this.state.colorId}`
			)
			.then((result) => {
				this.setState({ cards: result.data });
			})
			.catch((err) => {
				throw err;
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	/* CARD SELECTOR */

	addToDecklistFromCardSelector(card) {
		if (this.state.enabled) {
			this.setState({ enabled: false });
			let state;
			let cmc = card.cmc < 6 ? card.cmc : 6;
			let updatedList = this.state.list;
			if (updatedList[cmc]) updatedList[cmc].push(card);
			else updatedList[cmc] = [card];
			if (cmc === 6)
				updatedList[cmc].sort((a, b) => {
					return a.cmc - b.cmc;
				});
			updatedList[cmc].sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
			updatedList[cmc].sort((a, b) => {
				return a.color_identity
					.join("")
					.localeCompare(b.color_identity.join(""));
			});
			state = {
				pick: this.state.pick + 1,
				list: updatedList,
			};
			if (this.state.pick === "Leader")
				state = {
					type: "",
					colorId: card.color_identity.join("") || "c",
					pick: 2,
					commander: [card],
				};
			this.setState(state, () => {
				if (this.state.pick < this.state.nbrPick + 1) {
					axios
						.get(
							`https://mtgpickr.herokuapp.com/api/v1/cards/random?limit=${this.state.limit}&colorId=lte${this.state.colorId}`
						)
						.then((result) => {
							this.setState({
								enabled: true,
								cards: result.data,
							});
						})
						.catch((err) => {
							throw err;
						});
					return;
				}
			});
		}
	}

	CardSelector() {
		if (
			this.state.pick < this.state.nbrPick + 1 ||
			this.state.pick === "Leader"
		) {
			if (this._isMounted === true) {
				return this.state.cards.map((currentcard) => {
					return (
						<span className="mytooltip">
							<img
								key={currentcard._id}
								src={"data:image/jpg;base64," + currentcard.img}
								alt={"image : " + currentcard.name}
								className="img-fluid big-card"
								onClick={() =>
									this.addToDecklistFromCardSelector(
										currentcard
									)
								}
							></img>
							<span className="tooltip-content img-fluid">
								<img
									src={
										"data:image/jpg;base64," +
										currentcard.img
									}
									alt={"image too : " + currentcard.name}
								></img>
							</span>
						</span>
					);
				});
			} else {
				return <div className="spinner-border" role="status"></div>;
			}
		}
	}

	/* LIST OF SELECTED CARDS */

	addToSideBoard(card) {
		let sideboard = this.state.sideboard;
		let list = this.state.list;
		sideboard.push(card);
		let cmc = card.cmc < 6 ? card.cmc : 6;
		let index = list[cmc].indexOf(card);
		if (index > -1) {
			list[cmc].splice(index, 1);
		}
		if (list[cmc].length === 0) delete list[cmc];
		sideboard.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
		sideboard.sort((a, b) => {
			return a.color_identity
				.join("")
				.localeCompare(b.color_identity.join(""));
		});
		sideboard.sort((a, b) => {
			return a.cmc - b.cmc;
		});
		this.setState({ sideboard: sideboard, list: list });
	}

	CardList() {
		let arrayCmc = Object.values(this.state.list);
		return arrayCmc.map((cmclist) => {
			return (
				<div className="stack">
					{cmclist.map((currentcard) => {
						return (
							<span className="mytooltip">
								<img
									key={currentcard._id}
									src={
										"data:image/jpg;base64," +
										currentcard.img
									}
									alt={"image : " + currentcard.name}
									className="img-fluid small-card tooltip-item"
									onClick={() =>
										this.addToSideBoard(currentcard)
									}
								></img>
								<span className="tooltip-content">
									<img
										src={
											"data:image/jpg;base64," +
											currentcard.img
										}
										alt={"image too : " + currentcard.name}
									></img>
								</span>
							</span>
						);
					})}
				</div>
			);
		});
	}

	Commander() {
		return this.state.commander.map((currentcard) => {
			return (
				<div className="commander-stack">
					<span className="mytooltip">
						<img
							key={currentcard._id}
							src={"data:image/jpg;base64," + currentcard.img}
							alt={"image : " + currentcard.name}
							className="img-fluid commander-card"
						></img>
						<span className="tooltip-content img-fluid">
							<img
								src={"data:image/jpg;base64," + currentcard.img}
								alt={"image too : " + currentcard.name}
							></img>
						</span>
					</span>
				</div>
			);
		});
	}

	addToDecklistFromCardSideboard(card) {
		let cmc = card.cmc < 6 ? card.cmc : 6;
		let updatedList = this.state.list;
		if (updatedList[cmc]) updatedList[cmc].push(card);
		else updatedList[cmc] = [card];
		if (cmc === 6)
			updatedList[cmc].sort((a, b) => {
				return a.cmc - b.cmc;
			});
		updatedList[cmc].sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
		updatedList[cmc].sort((a, b) => {
			return a.color_identity
				.join("")
				.localeCompare(b.color_identity.join(""));
		});
		let sideboard = this.state.sideboard;
		sideboard.splice(sideboard.indexOf(card), 1);
		this.setState({
			list: updatedList,
			sideboard: sideboard,
		});
	}

	Sideboard() {
		return (
			<div className="stack ms-5">
				{this.state.sideboard.map((currentcard) => {
					return (
						<span className="mytooltip">
							<img
								key={currentcard._id}
								src={"data:image/jpg;base64," + currentcard.img}
								alt={"image : " + currentcard.name}
								className="img-fluid small-card tooltip-item"
								onClick={() =>
									this.addToDecklistFromCardSideboard(
										currentcard
									)
								}
							></img>
							<span className="tooltip-content">
								<img
									src={
										"data:image/jpg;base64," +
										currentcard.img
									}
									alt={"image too : " + currentcard.name}
								></img>
							</span>
						</span>
					);
				})}
			</div>
		);
	}

	/* COUNTER THAT INDICATE THE PROGRESSION */
	PickCounter() {
		if (
			this.state.pick < this.state.nbrPick + 1 ||
			this.state.pick === "Leader"
		)
			return (
				<div className="d-flex section align-items-center justify-content-center mb-auto">
					<h1 className="row mb-auto">
						{this.state.pick} / {this.state.nbrPick}
					</h1>
					<div>
						{this.state.colorId.split("").map((letter) => {
							return (
								<img
									key={letter}
									src={`${process.env.PUBLIC_URL}/assets/${letter}.png`}
									alt={letter}
									className="img-fluid mana-symbol"
								></img>
							);
						})}
					</div>
				</div>
			);
	}

	/* DOWNLOAD BUTTON AND FUNCTION TO GENERATE THE TXT FILE WITH THE DECKLIST */
	downloadList() {
		let list = Object.values(this.state.list).reduce((acc, curr) => {
			return [...acc, ...curr];
		}, []);
		let sideboard = this.state.sideboard.reduce((acc, curr) => {
			let name = curr.name;
			if (acc[name]) acc[name]++;
			else acc[name] = 1;
			return acc;
		}, {});
		list = list.reduce((acc, curr) => {
			if (acc[curr.name]) acc[curr.name]++;
			else acc[curr.name] = 1;
			return acc;
		}, {});

		list = { ...list, ...this.state.basiclands };
		let text = Object.keys(list).reduce((acc, curr) => {
			if (list[curr]) acc = `${acc} ${list[curr]} ${curr}\n`;
			return acc;
		}, "");
		text =
			text +
			Object.keys(sideboard).reduce((acc, curr) => {
				if (sideboard[curr])
					acc = `${acc}SB: ${sideboard[curr]} ${curr}\n`;
				return acc;
			}, "");
		let filename = `${this.state.commander[0].name} Deck.txt`.replace(
			/\s/g,
			""
		);
		var element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," + encodeURIComponent(text)
		);
		element.setAttribute("download", filename);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	DownloadButton() {
		if (this.state.pick === this.state.nbrPick + 1)
			return (
				<div className="sticky-bottom mt-5 mb-5">
					<input
						type="button"
						className="btn-lg btn-primary"
						value="Download list"
						onClick={() => this.downloadList()}
					/>
				</div>
			);
	}

	/* COUNTERS TO ADD BASIC LANDS TO THE LIST AT THE END OF THE DRAFT */
	handleCounterChange(land, event) {
		let basiclands = this.state.basiclands;
		basiclands[land] = event.target.value;
		this.setState({ basiclands: basiclands });
	}

	BasicLandCounter() {
		if (this.state.pick === this.state.nbrPick + 1)
			return (
				<div className="d-flex">
					<div className="basiclandcounter me-5">
						<img
							key="W"
							src={`${process.env.PUBLIC_URL}/assets/W.png`}
							alt="W"
							className="img-fluid mana-symbol"
						></img>
						<input
							type="number"
							class="form-control"
							value={`${this.state.basiclands.plains}`}
							onChange={(e) =>
								this.handleCounterChange("plains", e)
							}
						></input>
					</div>
					<div className="basiclandcounter me-5">
						<img
							key="U"
							src={`${process.env.PUBLIC_URL}/assets/U.png`}
							alt="U"
							className="img-fluid mana-symbol"
						></img>
						<input
							type="number"
							class="form-control"
							value={`${this.state.basiclands.island}`}
							onChange={(e) =>
								this.handleCounterChange("island", e)
							}
						></input>
					</div>
					<div className="basiclandcounter me-5">
						<img
							key="B"
							src={`${process.env.PUBLIC_URL}/assets/B.png`}
							alt="B"
							className="img-fluid mana-symbol"
						></img>
						<input
							type="number"
							class="form-control"
							value={`${this.state.basiclands.swamp}`}
							onChange={(e) =>
								this.handleCounterChange("swamp", e)
							}
						></input>
					</div>
					<div className="basiclandcounter me-5">
						<img
							key="G"
							src={`${process.env.PUBLIC_URL}/assets/G.png`}
							alt="G"
							className="img-fluid mana-symbol"
						></img>
						<input
							type="number"
							class="form-control"
							value={`${this.state.basiclands.forest}`}
							onChange={(e) =>
								this.handleCounterChange("forest", e)
							}
						></input>
					</div>
					<div className="basiclandcounter me-5">
						<img
							key="R"
							src={`${process.env.PUBLIC_URL}/assets/R.png`}
							alt="R"
							className="img-fluid mana-symbol"
						></img>
						<input
							type="number"
							class="form-control"
							value={`${this.state.basiclands.mountain}`}
							onChange={(e) =>
								this.handleCounterChange("mountain", e)
							}
						></input>
					</div>
				</div>
			);
	}

	render() {
		return (
			<div className="d-flex section align-items-center justify-content-center mb-auto">
				<div>{this.PickCounter()}</div>
				<div>{this.DownloadButton()}</div>
				<div>{this.BasicLandCounter()}</div>
				<div className="mt-5 mb-5">{this.CardSelector()}</div>
				<div className="d-flex cardlist align-items-top justify-content-center">
					{this.CardList()}
					{/* 				{this.Commander()} */}
					{this.Sideboard()}
				</div>
			</div>
		);
	}
}

export default CardSelector;

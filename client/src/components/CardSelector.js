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
			enabled: true,
		};
		this.handleClick = this.handleClick.bind(this);
		this.downloadList = this.downloadList.bind(this);
	}

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

	handleClick(currentcard) {
		if (this.state.enabled) {
			this.setState({ enabled: false });
			let state;
			if (this.state.pick === "Leader")
				state = {
					type: "",
					colorId: currentcard.color_identity.join("") || "c",
					pick: 2,
					commander: [currentcard],
				};
			else {
				let cmc = currentcard.cmc < 6 ? currentcard.cmc : 6;
				let updatedList = this.state.list;
				if (updatedList[cmc]) updatedList[cmc].push(currentcard);
				else updatedList[cmc] = [currentcard];
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
			}
			this.setState(state, () => {
				if (this.state.pick < 30) {
					axios
						.get(
							`https://mtgpickr.herokuapp.com/api/v1/cards/random?limit=${this.state.limit}&colorId=lte${this.state.colorId}`
						)
						.then((result) => {
							this.setState({ enabled: true });
							this.setState({ cards: result.data });
						})
						.catch((err) => {
							throw err;
						});
					return;
				}
			});
		}
	}

	downloadList() {
		let list = Object.values(this.state.list).reduce((acc, curr) => {
			return [...acc, ...curr];
		}, []);
		list = [...list, ...this.state.commander];
		list = list.reduce((acc, curr) => {
			if (acc[curr.name]) acc[curr.name]++;
			else acc[curr.name] = 1;
			return acc;
		}, {});
		let text = Object.keys(list).reduce((acc, curr) => {
			acc = `${acc} ${list[curr]} ${curr}\n`;
			return acc;
		}, "");
		let filename = `${this.state.commander[0].name} Deck`;
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

	CardSelector() {
		if (this.state.pick < 30 || this.state.pick === "Leader") {
			return this.state.cards.map((currentcard) => {
				return (
					<span className="mytooltip">
						<img
							key={currentcard._id}
							src={"data:image/jpg;base64," + currentcard.img}
							alt={"image : " + currentcard.name}
							className="img-fluid big-card"
							onClick={() => this.handleClick(currentcard)}
						></img>
						<span className="tooltip-content img-fluid">
							<img
								src={"data:image/jpg;base64," + currentcard.img}
								alt={"image too : " + currentcard.name}
							></img>
						</span>
					</span>
				);
			});
		}
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

	DownloadButton() {
		if (this.state.pick === 30)
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

	render() {
		return (
			<div className="d-flex section align-items-center justify-content-center mb-auto">
				<h1 className="row mb-auto">{this.state.pick} / 30</h1>
				<div>{this.DownloadButton()}</div>
				<div className="mt-5 mb-5">{this.CardSelector()}</div>
				<div className="d-flex cardlist">
					{this.CardList()}
					{this.Commander()}
				</div>
			</div>
		);
	}
}

export default CardSelector;

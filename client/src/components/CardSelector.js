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
			pick: "Commander",
			commander: [],
			cards: [],
			list: {},
			enabled: true,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		axios
			.get(
				`${window.location.host}/api/v1/cards/random/?limit=${this.state.limit}&type=${this.state.type}&colorId=lte${this.state.colorId}`
			)
			.then((result) => {
				this.setState({ cards: result.data });
			})
			.catch((err) => {
				throw err;
			});
	}

	handleClick(currentcard) {
		if (this.state.enabled) {
			this.setState({ enabled: false });
			let state;
			if (this.state.pick === "Commander")
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
				if (this.state.pick < 31) {
					axios
						.get(
							`${window.location.host}/api/v1/cards/random/?limit=${this.state.limit}&colorId=lte${this.state.colorId}`
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

	CardSelector() {
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
					<span className="tooltip-content">
						<img
							src={"data:image/jpg;base64," + currentcard.img}
							alt={"image too : " + currentcard.name}
						></img>
					</span>
				</span>
			);
		});
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
							onClick={() => this.handleClick(currentcard)}
						></img>
						<span className="tooltip-content">
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

	render() {
		return (
			<div className="d-flex section align-items-center justify-content-center mb-auto">
				<h1 className="row mb-auto">Pick : {this.state.pick} / 31</h1>
				<div className="mt-5 mb-5">{this.CardSelector()}</div>
				<div className="d-flex">
					{this.CardList()}
					{this.Commander()}
				</div>
			</div>
		);
	}
}

export default CardSelector;

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
			edhrec: "5000",
			limit: parseInt(props.limit, 10),
			pick: "Commander",
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
				`http://localhost:5000/api/v1/cards/random/?limit=${this.state.limit}&type=${this.state.type}&colorId=lte${this.state.colorId}&edhr=lte5000`
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
			let cmc = currentcard.cmc < 6 ? currentcard.cmc : 6;
			this.setState({ enabled: false });
			if (this.state.list[cmc]) this.state.list[cmc].push(currentcard);
			else this.state.list[cmc] = [currentcard];
			this.state.list[cmc].sort();
			if (cmc === 6)
				this.state.list[cmc].sort((a, b) => {
					return a.cmc - b.cmc;
				});
			let state;
			if (this.state.pick === "Commander")
				state = {
					type: "",
					colorId: currentcard.color_identity.join("") || "c",
					pick: 2,
					list: this.state.list,
				};
			else
				state = {
					pick: this.state.pick + 1,
					list: this.state.list,
				};
			this.setState(state, () => {
				axios
					.get(
						`http://localhost:5000/api/v1/cards/random/?limit=3&colorId=lte${this.state.colorId}&edhr=lte5000`
					)
					.then((result) => {
						this.setState({ enabled: true });
						this.setState({ cards: result.data });
					})
					.catch((err) => {
						throw err;
					});
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

	render() {
		return (
			<div className="d-flex section align-items-center justify-content-center">
				<h1 className="row mb-auto">Pick : {this.state.pick}</h1>
				<div className="mt-5 mb-5">{this.CardSelector()}</div>
				<div className="d-flex">{this.CardList()}</div>
			</div>
		);
	}
}

export default CardSelector;

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
			pick: 1,
			cards: [],
			list: [],
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
			this.setState({ enabled: false });
			this.state.list.push(currentcard);
			let state;
			if (this.state.pick === 1)
				state = {
					type: "",
					colorId: currentcard.color_identity.join("") || "c",
					pick: this.state.pick + 1,
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
				console.log(this.state.list);
			});
		}
	}

	CardSelector() {
		return this.state.cards.map((currentcard) => {
			return (
				<img
					key={currentcard._id}
					src={"data:image/jpg;base64," + currentcard.img}
					alt={"image : " + currentcard.name}
					className="img-fluid responsive zoom"
					onClick={() => this.handleClick(currentcard)}
				></img>
			);
		});
	}

	render() {
		return <div className="row">{this.CardSelector()}</div>;
	}
}

export default CardSelector;

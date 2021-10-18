import React, { Component } from "react";
import axios from "axios";

const Card = (props) => (
	<img
		src={"data:image/jpg;base64," + props.card.img}
		alt={"image : " + props.card.name}
		className="img-fluid responsive zoom"
	></img>
);

class CardSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: props.type,
			colorId: props.colorId,
			cmc: props.cmc,
			edhrec: props.edhrec,
			limit: parseInt(props.limit, 10),
			cards: [],
		};
	}

	componentDidMount() {
		axios
			.get(
				`http://localhost:5000/api/v1/cards/random/?limit=${this.props.limit}&type=${this.props.type}&colorId=lte${this.props.colorId}`
			)
			.then((result) => {
				this.setState({ cards: result.data });
			})
			.catch((err) => {
				throw err;
			});
	}
	CardSelector() {
		return this.state.cards.map((currentcard) => {
			return <Card card={currentcard} key={currentcard._id} />;
		});
	}

	render() {
		return <div className="row">{this.CardSelector()}</div>;
	}
}

export default CardSelector;

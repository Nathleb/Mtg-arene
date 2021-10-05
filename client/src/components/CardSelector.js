import React, { Component } from "react";
import axios from "axios";

const Card = (props) => (
	<img src={props.card.image_uris.png} alt={"image" + props.card.name}></img> //png?normal?
);

class CardSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
		};
	}

	componentDidMount() {
		axios
			.get(
				"http://localhost:5000/api/v1/cards/random/?limit=3&type=Legendary"
			)
			.then((result) => {
				this.setState({ cards: result.data });
			});
		console.log(this.state);
	}
	CardSelector() {
		return this.state.cards.map((currentcard) => {
			return <Card card={currentcard} key={currentcard._id} />;
		});
	}

	render() {
		return (
			<div>
				<h3>Pick 1</h3>
				{this.CardSelector()}
			</div>
		);
	}
}

export default CardSelector;

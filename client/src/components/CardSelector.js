import React, { Component } from "react";
import axios from "axios";

const Card = (props) => (
	<div className="col-md-2">
		<img
			src={"data:image/jpg;base64," + props.card.img}
			alt={"image : " + props.card.name}
			className="img-thumbnail"
		></img>
	</div>
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
		return (
			<div>
				<h3>Pick 1</h3>
				<div className="row">{this.CardSelector()}</div>
			</div>
		);
	}
}

export default CardSelector;

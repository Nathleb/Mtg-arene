import React, { Component } from "react";
import axios from "axios";

const Card = (props) => (
	<div className="card" style={{ width: "20rem" }}>
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
				`http://localhost:5000/api/v1/cards/random/?limit=${this.props.limit}&type=${this.props.type}&colorId=${this.props.colorId}`
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
			<div class="d-flex justify-content-center m-5">
				<div className="row">{this.CardSelector()}</div>
			</div>
		);
	}
}

export default CardSelector;

import React, { Component } from "react";

export default class CardList extends Component {
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

	render() {
		return <div> textInComponent </div>;
	}
}

import React, { Component } from "react";

export default class GameModeButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alt: this.props.alt,
			src: this.props.src,
		};
	}
	render() {
		return (
			<button
				className="card mx-auto"
				style={{ width: "20rem" }}
				onClick={() => console.log("clicked")}
			>
				<img
					src={`${process.env.PUBLIC_URL}/assets/${this.state.src}`}
					alt={this.state.alt}
					className="img-thumbnail"
				></img>
			</button>
		);
	}
}

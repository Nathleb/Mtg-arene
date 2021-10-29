import React, { Component } from "react";
import { Link } from "react-router-dom";

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
			<Link to="/pick" className="card mx-auto">
				<div className="myoverlay">
					<img
						src={`${process.env.PUBLIC_URL}/assets/${this.state.src}`}
						alt={this.state.alt}
						className="img-fluid gamemodebutton"
					></img>
					<div className="overlay-content">
						<h3>Start picking</h3>
					</div>
				</div>
			</Link>
		);
	}
}

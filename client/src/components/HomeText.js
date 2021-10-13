import React, { Component } from "react";

export default class HomeText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			titleText: "Welcome to Mtg mode",
			bodyText: "New way to play limited with your friends",
		};
	}

	render() {
		return (
			<div>
				<div className="jumbotron jumbotron-fluid p-4">
					<header className="Hometext">
						<h1 className="display-2 ">{this.state.titleText}</h1>
						<p className="lead"> {this.state.bodyText}</p>
					</header>
				</div>
			</div>
		);
	}
}

import React, { Component } from "react";

export default class Rules extends Component {
	render() {
		return (
			<div className="jumbotron about-text me-auto mb-auto mt-5 ms-5">
				<h1>The rules</h1>
				<p>
					<br></br>
					<br></br>
					The game propose a series of choices.<br></br> For each
					choice you'll have to pick one card among the ones proposed
					to you. The first card you choose is a bit special as it
					represent your leader which colors determine the colors of
					all the next cards that you'll have to choose from. The
					objective is to create a deck which contain a minimum of 40
					cards using any number of cards from your choice list and
					any number of basic lands.
				</p>
			</div>
		);
	}
}

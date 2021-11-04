import React, { Component } from "react";

export default class Rules extends Component {
	render() {
		return (
			<div className="rules d-flex">
				<h1 className="col me-5 mb-auto ms-5">The rules</h1>
				<div className="about-text d-flex">
					<div className="col me-5 mb-auto ms-5">
						<p>
							<br></br>
							The game proposes a series of choices.<br></br> For
							each choice you'll have to pick one card from among
							the ones proposed to you.<br></br>
							<br></br> The first card you choose is a bit special
							as it represents your leader which colors determine
							the colors of all the next cards that you'll have to
							choose from.
						</p>
					</div>
					<div className="col mb-auto ms-5 me-5">
						<p>
							<br></br>
							The objective is to create a deck which contains a
							minimum of 40 cards using any number of cards from
							your choices and any number of basic lands.
							<br></br>
							<br></br>
							You can now battle with your friends on{" "}
							<a
								href="https://cockatrice.github.io/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Cockatrice
							</a>{" "}
							or use your own cards if you have them at disposal.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

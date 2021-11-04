import React, { Component } from "react";

export default class About extends Component {
	render() {
		return (
			<div className="about-text d-flex">
				<div className="col me-5 mb-auto ms-5">
					<h1>Mtgpickr</h1>
					<p>
						<br></br>
						This website is meant to propose an alternative way to
						play{" "}
						<a
							href="https://mtg.fandom.com/wiki/Limited"
							target="_blank"
							rel="noopener noreferrer"
						>
							limited
						</a>{" "}
						with the game{" "}
						<a
							href="https://magic.wizards.com/fr"
							target="_blank"
							rel="noopener noreferrer"
						>
							Magic: the Gathering
						</a>
						. <br></br>
						<br></br>The rules are inspired by the Arena mode of{" "}
						<a
							href="https://playhearthstone.com/fr-fr"
							target="_blank"
							rel="noopener noreferrer"
						>
							Hearthstone
						</a>{" "}
						and adapted to fit Magic's mechanics.<br></br>
						<br></br>
						This website allow to export your card list in a format
						compatible with the great{" "}
						<a
							href="https://cockatrice.github.io/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Cockatrice
						</a>
						, or any print'n'play website like{" "}
						<a
							href="https://mtgprint.cardtrader.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Mtgprint
						</a>
						.
					</p>
				</div>
				<div className="col mb-auto ms-5 me-5">
					<h1>About me</h1>
					<p>
						<br></br>
					</p>
				</div>
			</div>
		);
	}
}

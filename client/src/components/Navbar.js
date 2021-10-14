import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
	render() {
		return (
			<nav
				className="navbar navbar-expand-lg"
				style={{ backgroundColor: "#e5d3da" }}
			>
				<Link to="/" className="navbar-brand mx-auto">
					<img
						src={`${process.env.PUBLIC_URL}/assets/logo.png`}
						alt="logo"
						width="408"
						className="img"
					></img>
				</Link>
			</nav>
		);
	}
}

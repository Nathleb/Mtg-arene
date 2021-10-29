import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar" style={{ backgroundColor: "#e5d3da" }}>
				<Link to="/" className="navbar-brand mx-auto">
					<img
						src={`${process.env.PUBLIC_URL}/assets/logo.png`}
						alt="logo"
						width="406"
						className="img-fluid"
					></img>
				</Link>
			</nav>
		);
	}
}

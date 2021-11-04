import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar d-flex">
				<Link to="/" className="navbar-brand">
					<img
						src={`${process.env.PUBLIC_URL}/assets/logo.png`}
						alt="logo"
						className="img-fluid-height"
					></img>
				</Link>
				<div className="d-flex">
					<Link
						to="/rules"
						className="navbar-brand about-button px-5 pb-1 pt-2"
					>
						<h4>Rules</h4>
					</Link>
					<Link
						to="/about"
						className="navbar-brand about-button px-5 pb-1 pt-2"
					>
						<h4>About</h4>
					</Link>
				</div>
			</nav>
		);
	}
}

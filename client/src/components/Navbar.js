import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
				<Link to="/" className="navbar-brand ml-5">
					Home
				</Link>
			</nav>
		);
	}
}

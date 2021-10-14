import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardSelector from "./components/CardSelector";
import Navbar from "./components/Navbar";
import GameModeButton from "./components/GameModeButton";

function App() {
	return (
		<Router>
			<Navbar />
			<Route
				path="/"
				exact
				render={(props) => (
					<GameModeButton
						{...props}
						src="commander-arena.jpg"
						alt="commander arena"
					/>
				)}
			/>
			<Route
				path="/pick"
				render={(props) => (
					<CardSelector
						{...props}
						type="Legendary Creature"
						colorId=""
						limit="3"
					/>
				)}
			/>
		</Router>
	);
}

export default App;

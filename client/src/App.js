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
			<main className=" main align-items-center justify-content-center">
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
							colorId="WURGB"
							limit="4"
						/>
					)}
				/>
			</main>
		</Router>
	);
}

export default App;

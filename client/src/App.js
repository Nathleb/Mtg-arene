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
			<div className="d-flex section align-items-center justify-content-center">
				<div className="align-items-center justify-content-center d-flex ">
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
								limit="6"
							/>
						)}
					/>
				</div>
			</div>
		</Router>
	);
}

export default App;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardSelector from "./components/CardSelector";
import Navbar from "./components/Navbar";
import GameModeButton from "./components/GameModeButton";
import About from "./components/About";
import Rules from "./components/Rules";

function App() {
	return (
		<Router>
			<Navbar />
			<main className="main align-items-center justify-content-center">
				<div className="buttonlist">
					<Route
						path="/"
						exact
						render={(props) => (
							<GameModeButton
								{...props}
								src="commander-arena.jpg"
								alt="ravnica"
							/>
						)}
					/>
				</div>
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
				<Route path="/about" render={(props) => <About />} />
				<Route path="/rules" render={(props) => <Rules />} />
			</main>
		</Router>
	);
}

export default App;

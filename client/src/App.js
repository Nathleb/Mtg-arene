import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardSelector from "./components/CardSelector";
import Navbar from "./components/Navbar";

function App() {
	return (
		<Router>
			<Navbar />
			<br />
			<Route path="/" exact component={CardSelector} />
		</Router>
	);
}

export default App;

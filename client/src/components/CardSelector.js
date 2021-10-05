import React, { Component } from "react";
import axios from 'axios'

class CardSelector extends Component {
	state = {
		cards: [],
	};

    componentDidMount(){
        axios.get('http://localhost:5000/api/v1/cards/random/?limit=3&type=Legendary')
        .then(result => {
            console.log(result)
        })
    }

	render() {
		const { cards } = this.state;
		return (
			<div>
				<p>Cardselector Component</p>
			</div>
		);
	}
}

export default CardSelector;

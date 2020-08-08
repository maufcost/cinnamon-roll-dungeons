import React, {Component} from "react"
import {Link} from "@reach/router"

import "./Home.css"

import electricalTomatoPlayer from "../images/electrical_tomato.png"
import blastBroccoliPlayer from "../images/blast_broccoli.png"
import deathCarrotPlayer from "../images/death_carrot.png"
import CRDLogo from "../images/crd_logo.png"

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chosenCharacter: null,
            characterImage: null
        }

        this.images = {
            "Electrical Tomato": electricalTomatoPlayer,
            "Blast Broccoli": blastBroccoliPlayer,
            "Death Carrot": deathCarrotPlayer

        }

        this.updateChosenCharacter = this.updateChosenCharacter.bind(this)
    }

    updateChosenCharacter = (event) => {
        const character = event.target.innerHTML
        const img = this.images[character]

        this.setState({
            chosenCharacter: character,
            characterImage: img
        })

        this.props.updateChosenCharacter(character, img)
    }

    render() {
        return (
            <section className="container">
                <header>
                    <img src={CRDLogo} alt="Cinnamon Roll Dungeons" width="150" />
                    <h1>Welcome to <span className="make-me-purple">Cinnamon</span> Roll <span className="make-me-purple">Dungeons</span></h1>
                </header>

                <h2>Select your character:</h2>
                <ul className="character-selection">
                    <li>
                        <img
                            src={electricalTomatoPlayer}
                            className="player-img"
                            alt="Electrical Tomato Character"
                        />
                        <button
                            onClick={this.updateChosenCharacter}
                            className="player-select-button"
                        >
                            Electrical Tomato
                        </button>
                    </li>
                    <li>
                        <img
                            src={blastBroccoliPlayer}
                            className="player-img"
                            alt="Blast Broccoli Character"
                        />
                        <button
                            onClick={this.updateChosenCharacter}
                            className="player-select-button"
                        >
                            Blast Broccoli
                        </button>
                    </li>
                    <li>
                        <img
                            src={deathCarrotPlayer}
                            className="player-img"
                            alt="Death Carrot Character"
                        />
                        <button
                            onClick={this.updateChosenCharacter}
                            className="player-select-button"
                        >
                            Death Carrot
                        </button>
                    </li>
                </ul>
                <div className="character-selected-info">
                    {this.state.chosenCharacter ? (
                        <p>Chosen character: <span className="make-me-bold">{this.state.chosenCharacter}</span></p>
                    ) : (
                        <p>No characters selected</p>
                    )}
                </div>

                <Link to="/map" className="yellow-button">
                    Start
                </Link>
            </section>
        )
    }
}

export default Home

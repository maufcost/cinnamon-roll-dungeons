import React, {Component} from 'react'
import './App.css'
import {Router} from "@reach/router"

import Home from "./components/Home"
import Map from "./components/Map"

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chosenCharacter: null,
            characterImage: null
        }
        this.updateChosenCharacter = this.updateChosenCharacter.bind(this)
    }

    updateChosenCharacter = (character, image) => {
        this.setState({
            chosenCharacter: character,
            characterImage: image
        })
    }

    render() {
        return (
            <div>
                <Router>
                    <Home
                        path="/"
                        updateChosenCharacter={this.updateChosenCharacter}
                    />

                    <Map
                        path="/map"
                        character={this.state.chosenCharacter}
                        characterImage={this.state.characterImage}
                    />
                </Router>
            </div>
        );
    }
}

export default App

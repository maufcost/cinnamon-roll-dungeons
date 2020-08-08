import React, {Component} from "react"

import Level from "./Level"

import "./Map.css"

import CRDLogo from "../images/crd_logo.png"

class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            character: null,
            selectedLevel: null,
            renderLevel: false
        }
        this.updateLevel = this.updateLevel.bind(this)
    }

    componentDidMount() {

        const character = this.props.character

        this.setState({
            character: character
        })
    }

    updateLevel = (event) => {
        const levelNumber = parseInt(event.target.id)

        this.setState({
            selectedLevel: levelNumber,
            renderLevel: true
        })
    }

    updateRenderLevel = () => {
        this.setState({
            renderLevel: false
        })
    }

    render() {
        return (
            <section className="container">
                <header>
                    <img src={CRDLogo} alt="Cinnamon Roll Dungeons" width="150" />
                </header>

                <div className="battle">
                    <section>
                        <ul className="map">
                            <li>
                                <button className="map-button" id="1" onClick={this.updateLevel}>Level 1</button>
                            </li>
                            <li className="arrow">&rarr;</li>
                            <li>
                                <button className="map-button" id="2" onClick={this.updateLevel}>Level 2</button>
                            </li>
                            <li className="arrow">&rarr;</li>
                            <li>
                                <button className="map-button" id="3" onClick={this.updateLevel}>Level 3</button>
                            </li>
                            <li className="arrow">&rarr;</li>
                            <li>
                                <button className="map-button" id="4" onClick={this.updateLevel}>Boss Level</button>
                            </li>
                        </ul>

                        {this.state.renderLevel && (
                            <Level
                                character={this.state.character}
                                characterImage={this.props.characterImage}
                                levelNumber={this.state.selectedLevel}
                                updateRenderLevel={this.updateRenderLevel}
                            />
                        )}
                    </section>
                </div>
            </section>
        )
    }
}

export default Map

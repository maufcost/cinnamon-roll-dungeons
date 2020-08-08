import React, {Component} from "react"

import "./Level.css"

import BossIronDonutImage from "../images/iron_donut.png"
import BossLevel2Image from "../images/boss_level2.png"
import BossLevel3Image from "../images/boss_level3.png"
import BossLevel4Image from "../images/boss_level4.png"

import Dice1 from "../images/dice1.png"
import Dice2 from "../images/dice2.png"
import Dice3 from "../images/dice3.png"
import Dice4 from "../images/dice4.png"
import Dice5 from "../images/dice5.png"
import Dice6 from "../images/dice6.png"
import DiceDefault from "../images/diceDefault.png"

class Level extends Component {

    constructor(props) {
        super(props)
        this.state = {
            level: null,
            currentBossLife: 100,
            currentPlayerLife: 100,
            message: null,
            rolledNumber: 0,
            rolledNumberImage: DiceDefault,
        }

        this.BOSS_ATTACK_DAMAGE = 20
        this.PLAYER_ATTACK_DAMAGE = 20

        this.bossNames = [
            'Iron Donut',
            'The Rock\'n Roll',
            'Too Lazy Boss',
            'King Cincinnati Roll IV'
        ]

        this.bossImages = [
            BossIronDonutImage,
            BossLevel2Image,
            BossLevel3Image,
            BossLevel4Image
        ]

        this.DICE_IMAGES = [
            Dice1, Dice2, Dice3, Dice4, Dice5, Dice6
        ]

        this.roll = this.roll.bind(this)
        this.renderGame = this.renderGame.bind(this)
        this.changeDiceState = this.changeDiceState.bind(this)
    }

    componentDidMount() {
        const bossLifeBar = document.getElementById("boss-life-inner-bar")
        const playerLifeBar = document.getElementById("player-life-inner-bar")
    }

    changeDiceState() {
        const randomNumber = Math.floor(Math.random() * 5) + 1
        this.setState({
        rolledNumber: randomNumber,
        rolledNumberImage: this.DICE_IMAGES[randomNumber - 1] })
    }

    roll() {
        for(let i = 0; i < 5; i++) {
            setTimeout(this.changeDiceState, i * 200)
        }

        setTimeout(
            () => {
        if ((this.state.rolledNumber % 2) === 0) {
            // The player attacks...
            const newBossLife = this.state.currentBossLife - this.BOSS_ATTACK_DAMAGE
            this.setState({ currentBossLife: newBossLife })

            // Changing the boss' life bar.
            const bossLifeBar = document.getElementById("boss-life-inner-bar")
            bossLifeBar.style.width = newBossLife + "%"

            // Setting winning message.
            if (newBossLife <= 0) {
                const message = 'Congratulations! You won the fight against the boss!'
                this.setState({ message })

                setTimeout(() => {
                    this.props.updateRenderLevel()
                }, 3000)
            }

        }else {
            // The boss attacks...
            const newPlayerLife = this.state.currentPlayerLife - this.PLAYER_ATTACK_DAMAGE
            this.setState({ currentPlayerLife: newPlayerLife })

            // Changing the player's life bar.
            const playerLifeBar = document.getElementById("player-life-inner-bar")
            playerLifeBar.style.width = newPlayerLife + "%";

            // Setting failure message.
            if (newPlayerLife <= 0) {
                const message = 'Oops! You lost. The boss defeated you'
                this.setState({ message })

                setTimeout(() => {
                    this.props.updateRenderLevel()
                }, 3000)
            }
        }
    }, 3000)
    }

    renderGame(level, characterName, characterImage) {
        if (level) {
            return (
                // Level selected. Show it.
                <div>
                    <h3>You are now playing Level <span className="make-me-bold">{ level }</span></h3>
                    <section className="level-sub-info">
                        <div className="add-info">
                            <p> You:
                                <span className="make-me-bold"> {characterName}</span>
                            </p>
                            <p>Your life:
                                <span className="make-me-bold"> {this.state.currentPlayerLife}</span>
                            </p>
                            <div>
                                <div id="player-life-outer-bar">
                                    <div id="player-life-inner-bar"></div>
                                </div>
                            </div>
                            <p>
                                <img className="player-img" src={characterImage} alt="Selected Character" />
                            </p>
                        </div>

                        <div>
                            <p>Rolled number:
                                <span className="make-me-bold"> {this.state.rolledNumber}</span>
                            </p>
                            <p>
                                <img id="diceImage" src={this.state.rolledNumberImage} alt="Dice roll"/>
                            </p>
                        </div>

                        <div className="add-info">
                            <p>Boss name:
                                <span className="make-me-bold"> {this.bossNames[level-1]}</span>
                            </p>
                            <p>Boss' Life:
                                <span className="make-me-bold"> {this.state.currentBossLife}</span>
                            </p>
                            <div>
                                <div id="boss-life-outer-bar">
                                    <div id="boss-life-inner-bar"></div>
                                </div>
                            </div>
                            <p>
                                <img className="player-img" src={this.bossImages[level-1]} alt="This Level's Boss" />
                            </p>
                        </div>
                    </section>
                    <button className="yellow-button" onClick={this.roll}>Roll</button>
                </div>
            )
        }
        return (
            // Default message: no level has been selected YET.
            <p>You are not fighting yet. Please, select a level to join.</p>
        )
    }

    render() {
        const level = this.props.levelNumber
        const message = this.state.message
        const characterName = this.props.character
        const characterImage = this.props.characterImage

        return (
            <div>
                {message != null ? (
                    // The player or the boss won.
                    <div>
                        {message}
                    </div>
                ) : (
                    // Game still happening...
                    this.renderGame(level, characterName, characterImage)
                )}

            </div>
        )
    }
}

export default Level

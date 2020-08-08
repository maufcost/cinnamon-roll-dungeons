import React, {Component} from "react"

import "./Level.css"

import BossIronDonutImage from "../images/iron_donut.png"
import BossLevel2Image from "../images/boss_level2.png"
import BossLevel3Image from "../images/boss_level3.png"
import BossLevel4Image from "../images/boss_level4.png"

class Level extends Component {

    constructor(props) {
        super(props)
        this.state = {
            level: null,
            currentBossLife: 100,
            currentPlayerLife: 100,
            message: null,
            rolledNumber: 0,
        }

        this.BOSS_ATTACK_DAMAGE = 20
        this.PLAYER_ATTACK_DAMAGE = 20

        this.bossNames = [
            'Iron Donut',
            'Too Lazy Boss',
            'The Rock\'n Roll',
            'King Cincinnati Roll IV'
        ]

        this.bossImages = [
            BossIronDonutImage,
            BossLevel2Image,
            BossLevel3Image,
            BossLevel4Image
        ]

        this.roll = this.roll.bind(this)
        this.renderGame = this.renderGame.bind(this)
    }

    roll() {
        const randomNumber = Math.floor(Math.random() * 10)
        this.setState({ rolledNumber: randomNumber })

        if ((randomNumber % 2) === 0) {
            // The player attacks...
            const newBossLife = this.state.currentBossLife - this.BOSS_ATTACK_DAMAGE
            this.setState({ currentBossLife: newBossLife })

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

            // Setting failure message.
            if (newPlayerLife <= 0) {
                const message = 'Oops! You lost. The boss defeated you'
                this.setState({ message })

                setTimeout(() => {
                    this.props.updateRenderLevel()
                }, 3000)
            }
        }
    }

    renderGame(level) {
        if (level) {
            return (
                // Level selected. Show it.
                <div>
                    <h3>You are now playing Level <span className="make-me-bold">{ level }</span></h3>
                    <section className="level-sub-info">
                        <div className="add-info">
                            <p>Your life:
                                <span className="make-me-bold"> {this.state.currentPlayerLife}</span>
                            </p>
                        </div>

                        <div>
                            <p>Rolled number:
                                <span className="make-me-bold"> {this.state.rolledNumber}</span>
                            </p>
                        </div>

                        <div className="add-info">
                            <p>Boss name:
                                <span className="make-me-bold"> {this.bossNames[level-1]}</span>
                            </p>
                            <p>Boss' Life:
                                <span className="make-me-bold"> {this.state.currentBossLife}</span>
                            </p>
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

        return (
            <div>
                {message != null ? (
                    // The player or the boss won.
                    <div>
                        {message}
                    </div>
                ) : (
                    // Game still happening...
                    this.renderGame(level)
                )}

            </div>
        )
    }
}

export default Level

import React, { Component } from 'react';
import './CharacterWindow.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import game from '../game';

const mapStateToProps = (state: AppState) => ({
    avatar: state.character.avatar,
    race: state.character.race,
    career: state.character.career,
    name: state.character.name,
    level: state.character.level,
    money: state.character.money,
    attack: state.character.attackPower,
    gem: state.character.gem
})

interface CharacterWindowProps {
    avatar: string
    race: string
    career: string
    name: string
    level: number
    money: number
    attack: number
    gem: number
}

class CharacterWindow extends Component<CharacterWindowProps> {

    constructor(props: object) {
        super(props as CharacterWindowProps)
    }

    render() {
        return (
            <div className="character-window">

            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    {}
)(CharacterWindow);

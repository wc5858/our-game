import React, { Component } from 'react';
import './CharacterWindow.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import game from '../game';
import { closeCharacter } from '../store/ui/actions';

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
    closeCharacter: typeof closeCharacter
}

class CharacterWindow extends Component<CharacterWindowProps> {

    constructor(props: object) {
        super(props as CharacterWindowProps)
    }

    render() {
        return (
            <div>
                <div className="screen-mask"></div>
                <div className="character-window">
                    <div className="character-avatar"><img src={this.props.avatar} /></div>
                    <div className="character-info">{`${this.props.name}`}</div>
                    <div className="character-close" onClick={() => this.props.closeCharacter()}></div>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    { closeCharacter }
)(CharacterWindow);

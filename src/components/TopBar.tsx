import React, { Component } from 'react';
import avatar1 from '../assets/avatar1.jpg';
import './TopBar.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import ButtonPlay from './ButtonPlay';
import game from '../game';
import { showCharacter } from '../store/ui/actions';

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

interface TopBarProps {
    avatar: string
    race: string
    career: string
    name: string
    level: number
    money: number
    attack: number
    gem: number
    showCharacter: typeof showCharacter
}

const listItems = [1, 2, 3, 4, 5, 6, 7, 8].map((number) =>
    <div className={`skill-slot skill-slot-${number}`} key={number}>
        <img src={avatar1} />
    </div>
);

class TopBar extends Component<TopBarProps> {

    constructor(props: object) {
        super(props as TopBarProps)
    }

    render() {
        return (
            <div className="topbar-box">
                <div className="topbar-avatar">
                    <img src={this.props.avatar} />
                </div>
                <div className="topbar-info">{`${this.props.race} ${this.props.career} ${this.props.name} lv${this.props.level}`}</div>
                <div className="topbar-data">
                    <span>{this.props.money}</span>
                    <span>{this.props.attack}</span>
                    <span>{this.props.gem}</span>
                </div>
                <div className="topbar-btn">
                    <ButtonPlay btnClick={() => game.play()} />
                </div>
                <div className="btn-character" onClick={() => this.props.showCharacter()}></div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    { showCharacter }
)(TopBar);

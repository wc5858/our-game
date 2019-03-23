import React, { Component } from 'react';
import avatar1 from '../assets/avatar1.jpg';
import ab2_POTION_Blue from '../assets/ab2_POTION_Blue.png';
import ab2_POTION_Burning from '../assets/ab2_POTION_Burning.png';
import './SkillBar.css';

import { connect } from "react-redux";
import { AppState } from '../store';

import game from '../game'
import { MP_POTION, HP_POTION } from '../game/types';

const mapStateToProps = (state: AppState) => ({
    hp: state.character.hp,
    mp: state.character.mp,
    curHp: state.character.curHp,
    curMp: state.character.curMp,
    xp: state.character.exp
})

interface SkillBarProps {
    hp: number
    mp: number
    curHp: number
    curMp: number
    xp: number
}

const listItems = [1, 2, 3, 4, 5, 6, 7, 8].map((number) =>
    <div className={`skill-slot skill-slot-${number}`} key={number}>
        <img src={avatar1} />
    </div>
);

class SkillBar extends Component<SkillBarProps> {

    constructor(props: object) {
        super(props as SkillBarProps)
    }

    handleKeyPress(e: any) {
        game.doSth()
        switch (e.keyCode) {
            case 101:
                // E
                console.log(1)
                game.usePotion(MP_POTION)
                break;
            case 113:
                // Q
                game.usePotion(HP_POTION)
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress)
    }

    render() {

        return (
        <div className="skill-box">
            <div className="skill-slot skill-slot-sm skill-slot-q" onClick={() => game.usePotion(HP_POTION)}>
                <img src={ab2_POTION_Burning} />
            </div>
            <div className="skill-slot skill-slot-sm skill-slot-e" onClick={() => game.usePotion(MP_POTION)}>
                <img src={ab2_POTION_Blue} />
            </div>
            {listItems}
            <div className="skill-hp">
                <div className="hp-bar" style={{ height: `${this.props.curHp / this.props.hp * 100}%` }} />
            </div>
            <div className="skill-mp">
                <div className="mp-bar" style={{ height: `${this.props.curMp / this.props.mp * 100}%` }} />
            </div>
            <div className="skill-xp">
                <div className="xp-bar" style={{ width: `${this.props.xp * 100}%` }} />
            </div>
            <div className="skill-shortcuts"></div>
        </div>
        )
    }
}

export default connect(
    mapStateToProps,
    {}
)(SkillBar);

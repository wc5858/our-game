import React, { Component } from 'react';
import avatar1 from '../assets/avatar1.jpg';
import fill_mp from '../assets/fill_mp.png';
import fill_hp from '../assets/fill_hp.png';
import fill_xp from '../assets/fill_xp.png';
import './SkillBar.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import { initCharacter } from '../store/character/actions';
import { sendMessage } from '../store/board/actions';
import { startGame } from '../store/ui/actions';

import game from '../game'

const mapStateToProps = (state: AppState) => ({
    show: state.ui.showSkill,
    hp: state.character.hp,
    mp: state.character.mp,
    curHp: state.character.curHp,
    curMp: state.character.curMp,
    xp: state.character.exp
})

interface SkillBarProps {
    show: boolean
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
                break;
            case 113:
                // Q
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress)
    }

    render() {

        return this.props.show ? (
            <div className="skill-box">
                <div className="skill-slot skill-slot-sm skill-slot-q">
                    <img src={avatar1} />
                </div>
                <div className="skill-slot skill-slot-sm skill-slot-e">
                    <img src={avatar1} />
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
            </div>
        ) : null
    }
}

export default connect(
    mapStateToProps,
    {}
)(SkillBar);

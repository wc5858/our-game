import React, { Component } from 'react';
import avatar1 from '../assets/avatar1.jpg';
import ab2_POTION_Blue from '../assets/ab2_POTION_Blue.png';
import ab2_POTION_Burning from '../assets/ab2_POTION_Burning.png';
import './SkillBar.css';

import { connect } from "react-redux";
import { AppState } from '../store';

import game from '../game'
import { MP_POTION, HP_POTION } from '../game/types';
import { POTION_COOLDOWN } from '../data/consts';

const mapStateToProps = (state: AppState) => ({
    hp: state.character.hp,
    mp: state.character.mp,
    curHp: state.character.curHp,
    curMp: state.character.curMp,
    xp: state.character.exp,
    hpPotionNum: state.character.hpPotionNum,
    mpPotionNum: state.character.mpPotionNum
})

interface SkillBarProps {
    hp: number
    mp: number
    curHp: number
    curMp: number
    xp: number
    mpPotionNum: number
    hpPotionNum: number
}

const listItems = [1, 2, 3, 4, 5, 6, 7, 8].map((number) =>
    <div className={`skill-slot skill-slot-${number}`} key={number}>
        <img src={avatar1} />
    </div>
);

class SkillBar extends Component<SkillBarProps> {

    state: {
        [key: string]: boolean
        q: boolean
        e: boolean
        1: boolean
        2: boolean
        3: boolean
        4: boolean
        5: boolean
        6: boolean
        7: boolean
        8: boolean
    }

    constructor(props: object) {
        super(props as SkillBarProps)
        this.state = {
            q: false,
            e: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
        }
    }

    useMpPotion = () => {
        this.setState({
            e: true
        })
        game.usePotion(MP_POTION, ()=>this.setState({
            e: false
        }))
    }
    useHpPotion = () => {
        this.setState({
            q: true
        })
        game.usePotion(HP_POTION, ()=>this.setState({
            q: false
        }))
    }

    handleKeyPress = (e: any) => {
        // game.doSth()
        switch (e.keyCode) {
            case 101:
                // E
                this.useMpPotion()
                break;
            case 113:
                // Q
                this.useHpPotion()
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
                <div className="skill-slot skill-slot-sm skill-slot-q" onClick={this.useHpPotion}>
                    <img src={ab2_POTION_Burning} />
                    <div className="cooldown-mask" style={this.state.q ? { animation: `cooldown ${POTION_COOLDOWN}ms` } : {}}></div>
                    <div className="item-num">{this.props.hpPotionNum}</div>
                </div>
                <div className="skill-slot skill-slot-sm skill-slot-e" onClick={this.useMpPotion}>
                    <img src={ab2_POTION_Blue} />
                    <div className="cooldown-mask" style={this.state.e ? { animation: `cooldown ${POTION_COOLDOWN}ms` } : {}}></div>
                    <div className="item-num">{this.props.mpPotionNum}</div>
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

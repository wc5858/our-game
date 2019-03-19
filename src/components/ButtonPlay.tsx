import React, { Component } from 'react';
import './ButtonPlay.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import { initCharacter } from '../store/character/actions';
import { sendMessage } from '../store/board/actions';
import { startGame } from '../store/ui/actions';

const mapStateToProps = (state: AppState) => ({
    show: state.ui.showStart
})

interface ButtonPlayProps {
    show: boolean
    sendMessage: typeof sendMessage
    initCharacter: typeof initCharacter
    startGame: typeof startGame
}

class ButtonPlay extends Component<ButtonPlayProps> {
    constructor(props: object) {
        super(props as ButtonPlayProps)
    }
    handleClick = () => {
        this.props.initCharacter({
            name: '二狗',
            careerID: '001'
        })
        this.props.startGame()
        this.props.sendMessage({
            text: '游戏开始！请选择种族和职业！'
        })
    }
    render() {
        return (
            this.props.show ? <div className="button-play" onClick={this.handleClick}></div> : null
        )
    }
}

export default connect(
    mapStateToProps,
    { initCharacter, startGame, sendMessage }
)(ButtonPlay);
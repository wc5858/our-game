import React, { Component } from 'react';
import './ButtonPlay.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import { initCharacter } from '../store/character/actions';
import { startGame } from '../store/ui/actions';

const mapStateToProps = (state: AppState) => ({
    show: state.ui.showStart
})

interface ButtonPlayProps {
    show: boolean
    initCharacter: typeof initCharacter
    startGame: typeof startGame
}

class ButtonPlay extends Component<ButtonPlayProps> {
    show: boolean
    constructor(props: object) {
        super(props as ButtonPlayProps)
        this.show = true
    }
    handleClick = () => {
        this.props.initCharacter({
            name: '二狗',
            careerID: '001'
        })
        this.props.startGame()
    }
    render() {
        return (
            this.props.show ? <div className="button-play" onClick={this.handleClick}></div> : null
        )
    }
}

export default connect(
    mapStateToProps,
    { initCharacter, startGame }
)(ButtonPlay);
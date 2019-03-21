import React, { Component } from 'react';
import ButtonPlay from './ButtonPlay';
import './CareerBoard.css';
import careers from '../data/career';
import races from '../data/races';

import { connect } from "react-redux";
import { AppState } from '../store';
import { initCharacter } from '../store/character/actions';
import { sendMessage } from '../store/board/actions';
import { startGame } from '../store/ui/actions';

import game from '../game'

const mapStateToProps = (state: AppState) => ({
  show: state.ui.showCareer,
})

interface CareerBoardProps {
  show: boolean
  sendMessage: typeof sendMessage
  initCharacter: typeof initCharacter
  startGame: typeof startGame
}

function getList(type: string, careers: object, cb: Function, curSelected: number) {
  return Object.entries(careers).map(([key, data], idx) =>
    <div className={`${type}-slot career-slot-${idx} ${idx == curSelected ? 'career-selected' : ''}`}
      data-name={data.name}
      onClick={() => cb(idx)} key={key}>
      <img src={data.avatar} />
    </div>
  )
}

class CareerBoard extends Component<CareerBoardProps> {
  state: {
    raceSelected: number
    careerSelected: number
  }

  constructor(props: object) {
    super(props as CareerBoardProps)
    this.state = {
      raceSelected: 0,
      careerSelected: 0
    }
  }

  selectCareer = (i: number) => {
    this.setState({
      careerSelected: i
    })
  }

  selectRace = (i: number) => {
    this.setState({
      raceSelected: i
    })
  }

  componentDidMount() {
  }

  playGame = () => {
    this.props.initCharacter({
      name: '二狗',
      careerID: '001'
    })
    this.props.startGame()
    this.props.sendMessage({
      text: '游戏开始！'
    })
    game.init()
  }

  render() {

    return this.props.show ? (
      <div>
        <div className="career-box">
          {getList('race', races, this.selectRace, this.state.raceSelected)}
          {getList('career', careers, this.selectCareer, this.state.careerSelected)}
        </div>
        <ButtonPlay btnClick={this.playGame}/>
      </div>  
    ) : null
  }
}

export default connect(
  mapStateToProps,
  { initCharacter, startGame, sendMessage }
)(CareerBoard);

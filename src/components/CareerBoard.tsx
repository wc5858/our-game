import React, { Component } from 'react';
import ButtonPlay from './ButtonPlay';
import './CareerBoard.css';
import careers from '../data/careers';
import races from '../data/races';

import { connect } from "react-redux";
import { AppState } from '../store';
import { sendMessage } from '../store/board/actions';
import { startGame } from '../store/ui/actions';

import game from '../game'

const raceData = Object.entries(races)
const careerData = Object.entries(careers)

const mapStateToProps = (state: AppState) => ({
})

interface CareerBoardProps {
  sendMessage: typeof sendMessage
  startGame: typeof startGame
}

function getList(type: string, dataArr: [string, { name: string; avatar: string }][], cb: Function, curSelected: string) {
  return dataArr.map(([key, data], idx) =>
    <div className={`${type}-slot career-slot-${idx} ${key == curSelected ? 'career-selected' : ''}`}
      data-name={data.name}
      onClick={() => cb(key)} key={idx}>
      <img src={data.avatar} />
    </div>
  )
}

class CareerBoard extends Component<CareerBoardProps> {
  state: {
    raceSelected: string
    careerSelected: string
  }

  constructor(props: object) {
    super(props as CareerBoardProps)
    this.state = {
      raceSelected: Object.entries(races)[0][0],
      careerSelected: Object.entries(careers)[0][0],
    }
  }

  selectCareer = (key: string) => {
    this.setState({
      careerSelected: key
    })
  }

  selectRace = (key: string) => {
    this.setState({
      raceSelected: key
    })
  }

  playGame = () => {
    this.props.startGame()
    this.props.sendMessage({
      text: '游戏开始！'
    })
    game.init({
      raceID: this.state.raceSelected,
      careerID: this.state.careerSelected
    })
  }

  render() {
    return (
      <div>
        <div className="career-box">
          {getList('race', raceData, this.selectRace, this.state.raceSelected)}
          {getList('career', careerData, this.selectCareer, this.state.careerSelected)}
        </div>
        <div className="career-btn">
          <ButtonPlay btnClick={this.playGame} />
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  { startGame, sendMessage }
)(CareerBoard);

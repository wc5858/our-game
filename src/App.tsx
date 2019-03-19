import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import SkillBar from './components/SkillBar';
import Board from './components/Board';
import CareerBoard from './components/CareerBoard';

import { AppState } from './store';

import { BoardState } from './store/board/types';
import { CharacterState } from './store/character/types';

import { sendMessage } from './store/board/actions';
import { initCharacter } from './store/character/actions';

const mapStateToProps = (state: AppState) => ({
  board: state.board,
  character: state.character
})

interface AppProps {
  sendMessage: typeof sendMessage
  initCharacter: typeof initCharacter
  board: BoardState
  character: CharacterState
}

class App extends Component<AppProps> {

  componentDidMount() {
    this.props.sendMessage({
      text: "点击开始启动游戏！"
    })
  }

  render() {
    return (
      <div className="App">
        <Board messages={this.props.board.messages}
          sendMessage={this.props.sendMessage} />
        {/* <button onClick={e => (this.props.sendMessage({
          text: "点击开始启动游戏！"
        }))}>asda</button> */}
        <CareerBoard />
        <SkillBar />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { sendMessage, initCharacter }
)(App)

import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import SkillBar from './components/SkillBar';
import Board from './components/Board';
import TopBar from './components/TopBar';
import CareerBoard from './components/CareerBoard';

import { AppState } from './store';

import { BoardState } from './store/board/types';
import { CharacterState } from './store/character/types';

import { sendMessage } from './store/board/actions';
import { initCharacter } from './store/character/actions';
import { initGame } from './store/ui/actions';

const mapStateToProps = (state: AppState) => ({
  showSkill: state.ui.showSkill,
  showCareer: state.ui.showCareer,
  board: state.board,
  character: state.character
})

interface AppProps {
  showSkill: boolean
  showCareer: boolean
  sendMessage: typeof sendMessage
  initCharacter: typeof initCharacter
  initGame: typeof initGame
  board: BoardState
  character: CharacterState
}

class App extends Component<AppProps> {

  componentWillMount() {
    // this.props.initGame()
  }

  componentDidMount() {
    this.props.sendMessage({
      text: "请选择种族、职业后点击PLAY启动游戏！"
    })
  }

  render() {
    return (
      <div className="App">
        <Board messages={this.props.board.messages}
          sendMessage={this.props.sendMessage} />
        {this.props.showSkill ? <TopBar /> : null}
        {this.props.showCareer ? <CareerBoard /> : null}
        {this.props.showSkill ? <SkillBar /> : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { sendMessage, initCharacter, initGame }
)(App)

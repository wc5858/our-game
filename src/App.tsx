import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import SkillBar from './components/SkillBar';
import Board from './components/Board';
import TopBar from './components/TopBar';
import CareerBoard from './components/CareerBoard';

import { AppState } from './store';

import { BoardState } from './store/board/types';

import { sendMessage } from './store/board/actions';
import { initCharacter } from './store/character/actions';
import CharacterWindow from './components/CharacterWindow';
import ShopWindow from './components/ShopWindow';

const mapStateToProps = (state: AppState) => ({
  showBoards: state.ui.showBoards,
  showCareer: state.ui.showCareer,
  showCharacter: state.ui.showCharacter,
  showShop: state.ui.showShop,
  board: state.board
})

interface AppProps {
  showBoards: boolean
  showCareer: boolean
  showCharacter: boolean
  showShop: boolean
  sendMessage: typeof sendMessage
  initCharacter: typeof initCharacter
  board: BoardState
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
        {this.props.showBoards ? <TopBar /> : null}
        {this.props.showCareer ? <CareerBoard /> : null}
        {this.props.showCharacter ? <CharacterWindow /> : null}
        {this.props.showShop ? <ShopWindow /> : null}
        {this.props.showBoards ? <SkillBar /> : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { sendMessage, initCharacter }
)(App)

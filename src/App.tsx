import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import SkillBar from './components/SkillBar';
import Board from './components/Board';

import { AppState } from './store';

import { BoardState } from './store/board/types';
import { sendMessage } from './store/board/actions';

const mapStateToProps = (state: AppState) => ({
  board: state.board
})

interface AppProps {
  sendMessage: typeof sendMessage
  board: BoardState
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
        <Board messages={this.props.board.messages} sendMessage={this.props.sendMessage}/>
        {/* <button onClick={e => (this.props.sendMessage({
          text: "点击开始启动游戏！"
        }))}>asda</button> */}
        <SkillBar />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { sendMessage }
)(App)

import React, { Component } from 'react';
import './Board.css';
import TypedText from './TypedText';

import { connect } from "react-redux";
import { AppState } from '../store';
import { Message } from "../store/board/types";
import { sendMessage } from '../store/board/actions';
import { initCharacter } from '../store/character/actions';

const mapStateToProps = (state: AppState) => ({
  board: state.board,
  character: state.character
})

interface BoardProps {
  messages: Message[]
  initCharacter: typeof initCharacter
  sendMessage: typeof sendMessage
}

class Board extends Component<BoardProps> {
  constructor(props:object){
    super(props as BoardProps)
  }
  render() {
    return (
      <div className="board">
        <div className="board-info">
          {this.props.messages.map((message,idx)=>(
            <TypedText str={message.text} key={idx}/>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { initCharacter }
)(Board);
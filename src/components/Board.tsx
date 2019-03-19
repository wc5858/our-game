import React, { Component } from 'react';
import './Board.css';
import TypedText from './TypedText';
import ButtonPlay from './ButtonPlay';
import { Message } from "../store/board/types";
import { sendMessage } from '../store/board/actions';

interface BoardProps {
  messages: Message[];
  sendMessage: typeof sendMessage;
}

class Board extends Component<BoardProps> {
  constructor(props:object){
    super(props as BoardProps)
  }
  render() {
    return (
      <div className="board">
        <div className="board-info">
          {this.props.messages.map(message=>(
            <TypedText str={message.text}/>
          ))}
        </div>
        <ButtonPlay />
      </div>
    );
  }
}

export default Board;
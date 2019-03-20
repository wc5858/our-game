import React, { Component } from 'react';
import './ButtonPlay.css';

interface ButtonPlayProps {
  btnClick: Function
}

class ButtonPlay extends Component<ButtonPlayProps> {
  constructor(props: object) {
    super(props as ButtonPlayProps)
  }
  
  render() {
    return (
      <div className="button-play" onClick={e=>this.props.btnClick()}></div>
    )
  }
}

export default ButtonPlay;
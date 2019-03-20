import React, { Component } from 'react';
import avatar1 from '../assets/avatar1.jpg';
import './SkillBar.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import { initCharacter } from '../store/character/actions';
import { sendMessage } from '../store/board/actions';
import { startGame } from '../store/ui/actions';

import game from '../game'

const mapStateToProps = (state: AppState) => ({
  show: state.ui.showSkill
})

interface SkillBarProps {
  show: boolean
}

const listItems = [1, 2, 3, 4, 5, 6, 7, 8].map((number) =>
  <div className={`skill-slot skill-slot-${number}`} key={number}>
    <img src={avatar1} />
  </div>
);

class SkillBar extends Component<SkillBarProps> {

  constructor(props: object) {
    super(props as SkillBarProps)
  }

  handleKeyPress(e: any) {
    game.doSth()
    switch (e.keyCode) {
      case 101:
        // E
        break;
      case 113:
        // Q
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress)
  }

  render() {

    return this.props.show ? (
      <div className="skill-box">
        <div className="skill-slot skill-slot-sm skill-slot-q">
          <img src={avatar1} />
        </div>
        <div className="skill-slot skill-slot-sm skill-slot-e">
          <img src={avatar1} />
        </div>
        {listItems}
        <div className="skill-shortcuts"></div>
      </div>
    ) : null
  }
}

export default connect(
  mapStateToProps,
  {}
)(SkillBar);

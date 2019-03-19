import React, { Component } from 'react';
import avatar1 from '../assets/avatar1.jpg';
import './SkillBar.css';

const listItems = [1, 2, 3, 4, 5, 6, 7, 8].map((number) =>
  <div className={`skill-slot skill-slot-${number}`}>
    <img src={avatar1} />
  </div>
);

class SkillBar extends Component {

  handleKeyPress(e: any) {
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

    return (
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
    );
  }
}

export default SkillBar;

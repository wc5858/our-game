import React, { Component } from 'react';
import avatar1 from '../assets/avatar1.jpg';
import './TopBar.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import { initCharacter } from '../store/character/actions';
import { sendMessage } from '../store/board/actions';
import { startGame } from '../store/ui/actions';

const mapStateToProps = (state: AppState) => ({
  show: state.ui.showSkill
})

interface TopBarProps {
  show: boolean
}

const listItems = [1, 2, 3, 4, 5, 6, 7, 8].map((number) =>
  <div className={`skill-slot skill-slot-${number}`} key={number}>
    <img src={avatar1} />
  </div>
);

class TopBar extends Component<TopBarProps> {

  constructor(props: object) {
    super(props as TopBarProps)
  }

  componentDidMount() {
  }

  render() {

    return this.props.show ? (
      <div className="topbar-box">
        
      </div>
    ) : null
  }
}

export default connect(
  mapStateToProps,
  {}
)(TopBar);

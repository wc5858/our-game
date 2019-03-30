import React, { Component } from 'react';
import './SkillWindow.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import { closeCharacter } from '../store/ui/actions';
import CharacterEquipment from './CharacterEquipment';
import { parts } from '../game/types';
import { CharacterState } from '../store/character/types';
import EnhanceWindow from './EnhanceWindow';
import Equipment from '../game/EquipmentCreator/Equipment';

const mapStateToProps = (state: AppState) => ({
    character: state.character
})

interface SkillWindowProps {
    character: CharacterState
    closeCharacter: typeof closeCharacter
}

class SkillWindow extends Component<SkillWindowProps> {
    state: {
        showEnhance: false
        eqEnhancing: Equipment | null
    }
    constructor(props: object) {
        super(props as SkillWindowProps)
        this.state = {
            showEnhance: false,
            eqEnhancing: null
        }
    }

    changeEnhancing = (eq: Equipment) => {
        this.setState({
            showEnhance: true,
            eqEnhancing: eq
        })
    }

    render() {
        return (
            <div>
                <div className="screen-mask"></div>
                <div className="skill-window">
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    { closeCharacter }
)(SkillWindow);

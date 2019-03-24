import React, { Component } from 'react';
import './CharacterWindow.css';

import { connect } from "react-redux";
import { AppState } from '../store';
import { closeCharacter } from '../store/ui/actions';
import CharacterEquipment from './CharacterEquipment';
import { parts } from '../game/types';
import { CharacterState } from '../store/character/types';
import EnhanceWindow from './EnhanceWindow';
import { Equipment } from '../store/bag/types';

const mapStateToProps = (state: AppState) => ({
    character: state.character
})

interface CharacterWindowProps {
    character: CharacterState
    closeCharacter: typeof closeCharacter
}

class CharacterWindow extends Component<CharacterWindowProps> {
    state: {
        showEnhance: false
        eqEnhancing: Equipment | null
    }
    constructor(props: object) {
        super(props as CharacterWindowProps)
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
                <div className="character-window">
                    <div className="character-avatar"><img src={this.props.character.avatar} /></div>
                    <div className="character-info">{`${this.props.character.name}`}</div>
                    <div className="character-close" onClick={() => this.props.closeCharacter()}></div>
                    {parts.map((i, idx) =>
                        <CharacterEquipment key={idx} type={i} equiped={1} changeEnhancing={this.changeEnhancing} />)}
                    <CharacterEquipment type="ring" equiped={2} changeEnhancing={this.changeEnhancing} />
                    <CharacterEquipment type="rune" equiped={2} changeEnhancing={this.changeEnhancing} />
                    <div className="character-data">
                        <div><div>血量</div><div>{this.props.character.hp}</div></div>
                        <div><div>蓝量</div><div>{this.props.character.mp}</div></div>
                        <div><div>攻击力</div><div>{this.props.character.attackPower}</div></div>
                        <div><div>攻击速度</div><div>{this.props.character.attackSpeed}</div></div>
                        <div><div>攻击力成长</div><div>{this.props.character.attackGrow}</div></div>
                        <div><div>血量成长</div><div>{this.props.character.hpGrow}</div></div>
                        <div><div>蓝量成长</div><div>{this.props.character.mpGrow}</div></div>
                    </div>
                    {this.state.showEnhance && this.state.eqEnhancing ?
                        <EnhanceWindow eq={this.state.eqEnhancing} closeEnhance={() => this.setState({ showEnhance: false })} /> : null}
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    { closeCharacter }
)(CharacterWindow);

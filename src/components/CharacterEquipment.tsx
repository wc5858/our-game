import React, { Component } from 'react';
import './ButtonPlay.css';
import { BagState } from '../store/bag/types';
import './CharacterEquipment.css';
import { connect } from "react-redux";
import { AppState } from '../store';
import ItemIcon from './ItemIcon';
import game from '../game';

const mapStateToProps = (state: AppState) => ({
    bag: state.bag
})

interface CharacterEquipmentProps {
    type: string
    equiped: number
    bag: BagState
}

class CharacterEquipment extends Component<CharacterEquipmentProps> {
    state: {
        showMore: boolean
    }
    constructor(props: object) {
        super(props as CharacterEquipmentProps)
        this.state = {
            showMore: false
        }
    }

    getIcon = () => {
        const equiped = this.props.bag[this.props.type].filter(i => i.equiped == this.props.equiped)
        return equiped.length > 0 ? <ItemIcon item={equiped[0]} /> : null
    }

    getMore = () => {
        const data = this.props.bag[this.props.type]
        return (<div className="equipment-bag">
            {data.length > 0 ? data.map((i,idx) =>
                <div onClick={() => game.wear(this.props.type, this.props.equiped, i.id)} key={idx}
                ><ItemIcon item={i} /></div>) : '空'}
        </div>)
    }

    render() {
        return (
            <div className={`character-equipment equipment-${this.props.type}-${this.props.equiped}`}
            >
                {this.getIcon()}
                <div className="equipment-enhance">强化</div>
                <div className="equipment-change" onClick={() => this.setState({ showMore: !this.state.showMore })}>更换</div>
                {this.state.showMore ? this.getMore() : null}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    {}
)(CharacterEquipment);
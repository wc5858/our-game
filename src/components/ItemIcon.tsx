import React, { Component } from 'react';
import './ItemIcon.css';
import Equipment from '../game/EquipmentCreator/Equipment';
import { rarityColor } from '../game/types';

interface ItemIconProps {
    item: Equipment
}

class ItemIcon extends Component<ItemIconProps> {
    constructor(props: object) {
        super(props as ItemIconProps)
    }

    render() {
        return (
            <div className={`icon-item icon-item-${rarityColor[this.props.item.rarity]}`} >
                <img src={this.props.item.avatar} />
                <div className="item-detail">
                    <div>{`${this.props.item.name}+${this.props.item.enhancedLevel}`}</div>
                    {this.props.item.attributes.map((i, idx) => <div key={idx}>{i.dsc + i.value}</div>)}
                </div>
            </div>
        )
    }
}

export default ItemIcon;
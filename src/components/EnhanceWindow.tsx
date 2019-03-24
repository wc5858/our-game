import React, { Component } from 'react';
import './EnhanceWindow.css';
import ItemIcon from './ItemIcon';
import { Equipment } from '../store/bag/types';
import game from '../game';

interface EnhanceWindowProps {
    eq: Equipment
    closeEnhance: Function
}

class EnhanceWindow extends Component<EnhanceWindowProps> {

    constructor(props: object) {
        super(props as EnhanceWindowProps)
    }

    render() {
        return (
            <div className="enchance-window">
                <div className="enchance-close" onClick={() => this.props.closeEnhance()}>关闭</div>
                <ItemIcon item={this.props.eq} />
                <div>当前强化等级{this.props.eq.enhancedLevel}</div>
                <div>强化到下一级需要{`${100 * (this.props.eq.enhancedLevel + 1)}`}宝石，属性在当前基础上增加10%</div>
                <div>成功率50%</div>
                <div className="enchance-btn" onClick={()=>game.enhance(this.props.eq)}>点击强化</div>
            </div>
        )
    }
}

export default EnhanceWindow;
import React, { Component } from 'react';
import './ShopWindow.css';
import ItemIcon from './ItemIcon';
import { Equipment } from '../store/bag/types';
import game from '../game';
import { connect } from "react-redux";
import { AppState } from '../store';
import { CharacterState } from '../store/character/types';
import { closeShop } from '../store/ui/actions';
import redPotion from '../assets/ab2_POTION_Burning.png'
import bluePotion from '../assets/ab2_POTION_Blue.png'
import { POTION_COOLDOWN } from '../data/consts';
import { POTION_PRICE } from '../game/types';

const mapStateToProps = (state: AppState) => ({
    character: state.character
})

interface ShopWindowProps {
    character: CharacterState
    closeShop: typeof closeShop
}

class ShopWindow extends Component<ShopWindowProps> {

    constructor(props: object) {
        super(props as ShopWindowProps)
    }

    render() {
        return (
            <div>
                <div className="screen-mask"></div>
                <div className="shop-window">
                    <div className="shop-close" onClick={() => this.props.closeShop()}>关闭</div>
                    <div className="shop-buy" onClick={()=>game.buyItem('hpPotionNum',1)}>购买血瓶*1 <img src={redPotion} /> （价格${POTION_PRICE}金钱）</div>
                    <div className="shop-buy" onClick={()=>game.buyItem('hpPotionNum',5)}>购买血瓶*5 <img src={redPotion} /> （价格{5*POTION_PRICE}金钱）</div>
                    <div className="shop-buy" onClick={()=>game.buyItem('mpPotionNum',1)}>购买蓝瓶*1 <img src={bluePotion} /> （价格{POTION_PRICE}金钱）</div>
                    <div className="shop-buy" onClick={()=>game.buyItem('mpPotionNum',5)}>购买蓝瓶*5 <img src={bluePotion} /> （价格{5*POTION_PRICE}金钱）</div>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    { closeShop }
)(ShopWindow);
export default interface Round {
    init: Function
    doAttack: Function
    callEndBattle: Function
    callEndGame: Function
    isEnd: boolean
}
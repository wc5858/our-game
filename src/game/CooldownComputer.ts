export class CooldownComputer {
    private usable: boolean = true
    private cdTime: number
    private cbHook: Function | null
    private timer: NodeJS.Timeout | null = null
    constructor(cdTime: number, cbHook?: Function) {
        this.cdTime = cdTime
        this.cbHook = cbHook ? cbHook : null
    }
    getStatus() {
        if (!this.usable) {
            return false
        }
        this.usable = false
        this.timer = setTimeout(() => {
            this.usable = true
            if (this.cbHook) this.cbHook()
        }, this.cdTime);
        return true
    }
    resetStatus() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.usable = true
            if (this.cbHook) this.cbHook()
        }
    }
}
export default class Timer {
    constructor(delay, callback) {
        this.delay = delay;
        this.callback = callback;
        this.timeout = null;
        this.startTime = null;
    }

    start() {
        this.startTime = new Date();
        this.timeout = setTimeout(()=> {
            this.startTime = new Date();
            this.callback();
        }, this.delay);
    }

    reset() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.start();
    }
}

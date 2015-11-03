
export default class OverlayWindow {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        //// debug
        document.querySelector('body').appendChild(this.canvas);
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
}

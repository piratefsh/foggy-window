import Debug from 'Debug';

export default class OverlayWindow {

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.lines = [];

        //// debug
        // document.querySelector('body').appendChild(this.canvas);
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;

        //// this.debug()
    }

    draw(newLine, x, y) {
        const context = this.context;

        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 35;
        context.strokeStyle = 'rgba(255,0,0,0.05)';

        let currLine = this.lines[this.lines.length - 1];

        if (newLine) {
            currLine = [];
            this.lines.push(currLine);
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);

        }   else if (currLine.length < 2) {
            //not enough points to start drawing
        }   else {
            const twoPointsBack = currLine[currLine.length - 2];
            const onePointBack = currLine[currLine.length - 1];
            const x0 = twoPointsBack [0]; //x coordinate or previous point in path
            const y0 = twoPointsBack [1];

            const x1 = onePointBack [0]; //this is where the center of the curve should pass through
            const y1 = onePointBack [1];

            //formulas from: http://codetheory.in/calculate-control-point-to-make-your-canvas-curve-hit-a-specific-point/
            const controlX = x1 * 2 - (x0 + x) / 2;
            const controlY = y1 * 2 - (y0 + y) / 2;

            context.quadraticCurveTo(controlX, controlY, x, y);
        }

        currLine.push([x, y]);
        context.stroke();

        let overlayImgData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        return overlayImgData;
    }

    // generate clear parts given image data of unblurred image
    makeClear(unblurredImageData) {
        let data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
        let pixels = new Uint8ClampedArray(data.length);

        for (let i = 0; i < data.length; i = i + 4) {
            if (data[i] != 0) {
                pixels[i] = unblurredImageData.data[i];
                pixels[i + 1] = unblurredImageData.data[i + 1];
                pixels[i + 2] = unblurredImageData.data[i + 2];
                pixels[i + 3] = data[i + 3];
            }
        }

        let overlay = new ImageData(pixels, this.canvas.width, this.canvas.height);
        this.context.putImageData(overlay, 0, 0);

        return this.canvas;
    }

    debug() {
        this.debugger = new Debug();
        this.debugger.beginPath(this.context, 455, 149);
        this.debugger.quadraticCurve(this.context, 455, 149, 455, 147);
        this.debugger.quadraticCurve(this.context, 455, 147, 458, 139);
        this.debugger.quadraticCurve(this.context, 458, 139, 480, 114);
        this.debugger.quadraticCurve(this.context, 480, 114, 501, 103);
        this.debugger.quadraticCurve(this.context, 501, 103, 507, 101);
        this.debugger.quadraticCurve(this.context, 507, 101, 507, 101);
        this.debugger.quadraticCurve(this.context, 507, 101, 514, 100);
    }
}

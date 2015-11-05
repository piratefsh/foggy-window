import Debug from 'util/Debug';

export default class OverlayWindow {

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.lines = [];
        this.isTransitioning = false;

        //// debug
        document.querySelector('#canvases').appendChild(this.canvas);
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    // draw new line or continue from previous
    draw(newLine, x, y) {
        const context = this.context;

        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 35;
        context.strokeStyle = 'rgba(255,0,0,0.2)';
        context.shadowColor = 'rgba(255,0,0,1)'
        context.shadowBlur = 1

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

    // empty canvas
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }

    // set canvas opacity
    setOpacity(opacity) {
        this.canvas.style.opacity = opacity;
    }

    // draw unblurry parts
    drawClear(unblurredImageData) {
        const clearParts = this.makeClear(unblurredImageData);
        this.context.putImageData(clearParts, 0, 0);
    }

    // generate clear parts given image data of unblurred image to be drawn
    // returns ImageData of clear parts
    makeClear(unblurredImageData) {
        let data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
        let pixels = new Uint8ClampedArray(data.length);

        for (let i = 0; i < data.length; i = i + 4) {
            if (data[i] != 0 || data[i + 1] != 0 || data[i + 3] != 0) {
                pixels[i] = unblurredImageData.data[i];
                pixels[i + 1] = unblurredImageData.data[i + 1];
                pixels[i + 2] = unblurredImageData.data[i + 2];
                pixels[i + 3] = data[i + 3];
            }
        }

        let overlay = new ImageData(pixels, this.canvas.width, this.canvas.height);

        return overlay;
    }
}

import StackBlur from 'stackblur-canvas';
import OverlayWindow from 'OverlayWindow';
import Debug from 'Debug';

export default class FoggyWindow {

  constructor(query) {

    this.debugger = new Debug();

    // setup canvas
    this.canvas = document.querySelector(query);
    this.overlay = new OverlayWindow();

    this.context = this.canvas.getContext('2d');
    this.context.scale(window.devicePixelRatio / 2, window.devicePixelRatio / 2);
    this.startedDrawing = false;
    this.blurRadius = 18;
    this.lightenColor = 'rgba(255,255,255,0.14)';
    this.lines = [];
    this.unblurredImageData = null;

    let moveListener = (event) => this.draw(event);

    window.onresize = () => {
        this.render();
        this.drawClear();
    };

    this.canvas.addEventListener('mousedown', (event) => {
        //console.log('mousedown')
        this.draw(event);
        this.canvas.addEventListener('mousemove', moveListener);
    });
    this.canvas.addEventListener('touchstart', (event) => {
        event.preventDefault();
        this.draw(event);
        this.canvas.addEventListener('touchmove', moveListener);
    });
    this.canvas.addEventListener('mouseup', (event) => {
        //console.log('mouseup')
        this.startedDrawing = false;
        event.target.removeEventListener('mousemove', moveListener);
    });
    this.canvas.addEventListener('touchend', (event) => {
        this.startedDrawing = false;
        event.target.removeEventListener('touchmove', moveListener);
    });
  }

  setScenery(scenery) {
    this.scenery = scenery;
    this.scenery.onload = () => {
        this.render();
    };
  }

  getImageOffset(image) {
    const imgAspectRatio = image.width / image.height;
    const canvasAspectRatio = this.canvas.width / this.canvas.height;

    let imgRenderHeight, imgRenderWidth, imgOffsetX, imgOffsetY;

    if (canvasAspectRatio <= imgAspectRatio) { //canvas is skinnier than the image

        imgRenderWidth = this.canvas.height * imgAspectRatio;
        imgRenderHeight = this.canvas.height;

        //offset the x
        imgOffsetX = -(imgRenderWidth - this.canvas.width) / 2;
        imgOffsetY = 0;

    } else {

        imgRenderWidth = this.canvas.width;
        imgRenderHeight = this.canvas.width / imgAspectRatio;

        //offset the y
        imgOffsetX = 0;
        imgOffsetY = -(imgRenderHeight - this.canvas.height) / 2;
    }

    return [imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight];
  }

  render() {

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.overlay.setSize(window.innerWidth, window.innerHeight);

    this.startedDrawing = false;

    let [imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight] = this.getImageOffset(this.scenery);
    this.context.drawImage(this.scenery, imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight);

    // save unblurred image
    this.unblurredImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    this.lighten();
    this.blur(this.blurRadius);
  }

  lighten() {
    this.context.fillStyle = this.lightenColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.stroke();
  }

  blur(radius) {
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const blurred = StackBlur.imageDataRGB(imageData, 0, 0, this.canvas.width, this.canvas.height, radius);
    this.context.putImageData(blurred, 0, 0);
  }

  draw(event) {
    let x, y;

    const context = this.overlay.context;

    if ('clientX' in event) {
        x = event.clientX;
        y = event.clientY;
    } else if ('touches' in event) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        console.error('Unknown event sent to draw function');
    }

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 35;
    context.strokeStyle = 'rgba(255,0,0,0.05)';

    let currLine = this.lines[this.lines.length-1]

    if (!this.startedDrawing) {
        currLine = []
        this.lines.push(currLine)
        context.beginPath();
        context.moveTo(x, y);
        this.startedDrawing = true;
        context.lineTo(x + 1, y + 1);

    } 
    else if (currLine.length < 2) {
        //not enough points to start drawing
    }
     else {
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

    let overlayImgData = context.getImageData(0, 0, this.overlay.canvas.width, this.overlay.canvas.height);
    this.drawClear(overlayImgData);
  }

  drawClear(imgData) {
    const clearParts = this.overlay.makeClear(this.unblurredImageData);
    this.context.drawImage(this.overlay.canvas, 0, 0);
  }

  savePic(filename) {
    var link = document.createElement('a');
    link.download = filename;
    link.href = this.canvas.toDataURL();
    link.click();
  }
}

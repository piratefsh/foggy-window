import 'styles/style.scss';
import StackBlur from 'stackblur-canvas';
import dock from 'images/dock.jpg';

class FoggyWindow {

  constructor() {
    // setup canvas
    this.canvas = document.querySelector('.foggy-window');

    this.context = this.canvas.getContext('2d');
    this.context.scale(window.devicePixelRatio / 2, window.devicePixelRatio / 2);
    this.startedDrawing = false;
    this.blurRadius = 10;
    this.points = [];

    // draw image
    this.scenery = new Image();
    this.scenery.src = dock;
    this.scenery.onload = () => {
        this.render();

        /// debug
        this.clip();
    };

    let moveListener = (event) => this.draw(event);

    window.onresize = () => this.render();

    this.canvas.addEventListener('mousedown', (event) => {
        //console.log('mousedown')
        this.draw(event);
        this.canvas.addEventListener('mousemove', moveListener);
    });
    this.canvas.addEventListener('touchstart', (event) => {
        this.draw(event);
        this.canvas.addEventListener('touchmove', moveListener);
    });
    this.canvas.addEventListener('mouseup', (event) => {
        //console.log('mouseup')
        this.startedDrawing = false;
        event.target.removeEventListener('mousemove', moveListener);
        this.points = [];
    });
    this.canvas.addEventListener('touchend', (event) => {
        this.startedDrawing = false;
        event.target.removeEventListener('touchmove', moveListener);
        this.points = [];
    });
  }

  getImageOffset(image) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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

    this.startedDrawing = false;
    let [imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight] = this.getImageOffset(this.scenery);
    this.context.drawImage(this.scenery, imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight);

    // save unblurred image
    this.unblurredImage = new Image();
    this.unblurredImage.src = this.canvas.toDataURL();

    this.lighten();
    this.blur(this.blurRadius);
  }

  lighten() {
    this.context.fillStyle = 'rgba(255,255,255,0.1)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.stroke();
  }

  blur(radius) {
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const blurred = StackBlur.imageDataRGB(imageData, 0, 0, this.canvas.width, this.canvas.height, radius);
    this.context.putImageData(blurred, 0, 0);
  }

  draw(event) {

    //console.log(this.points)
    //console.log(this.startedDrawing)
    let x, y;

    if ('clientX' in event) {
        x = event.clientX;
        y = event.clientY;
    } else if ('touches' in event) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        console.error('Unknown event sent to draw function');
    }

    this.context.lineCap = 'round';
    this.context.lineWidth = 35;
    this.context.strokeStyle = 'rgba(255,255,255,0.05)';

    if (!this.startedDrawing) {
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.startedDrawing = true;
        this.context.lineTo(x + 1, y + 1);

    } else {
        const previousPoint = this.points[this.points.length - 1];
        const x0 = previousPoint [0]; //x coordinate or previous point in path
        const y0 = previousPoint [1];
        const midpointX = parseInt((x + x0) / 2);
        const midpointY = parseInt((y + y0) / 2);

        this.context.quadraticCurveTo(midpointX, midpointY, x, y);

        // debugPoint(this.context, midpointX, midpointY);
    }

    this.context.stroke();
    this.points.push([x, y]);
  }

  clip() {
    this.context.save();
    this.context.beginPath();

    const size = 200;
    const x = this.canvas.width / 2 - size / 2;
    const y = this.canvas.height / 2 - size / 2;

    this.context.moveTo(x, y);
    this.context.lineTo(x, y + size);
    this.context.lineTo(x + size, y + size);
    this.context.lineTo(x + size, y);
    this.context.closePath();

    this.context.clip();
    this.context.drawImage(this.unblurredImage, x, y, size, size, x, y, size, size);
    this.context.restore();
  }
}

function debugPoint(context, x, y) {
    context.fillStyle = '#ff0022';
    context.fillRect(x, y, 3, 3);
    context.stroke();
    console.log(x, y);
}

const foggy = new FoggyWindow();

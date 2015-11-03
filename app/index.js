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
    this.points = [];

    // draw image
    this.scenery = new Image();
    this.scenery.src = dock;
    this.scenery.onload = () => {
        this.render();
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

  render() {

    this.startedDrawing = false;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const imgAspectRatio = this.scenery.width / this.scenery.height;
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

    this.context.drawImage(this.scenery, imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight);

    this.blur(8);
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

    if (!this.startedDrawing) {
        this.context.beginPath();
        this.context.moveTo(x,y);
        this.startedDrawing = true;
        this.context.lineTo(x+1,y+1);

    } else {
        const previousPoint = this.points[this.points.length-1];
        const x0 = previousPoint [0]; //x coordinate or previous point in path
        const y0 = previousPoint [1];
        const midpointX = parseInt((x + x0)/2);
        const midpointY = parseInt((y + y0)/2);

        this.context.strokeStyle = 'rgba(255,255,255,0.05)'
        
        this.context.quadraticCurveTo(midpointX, midpointY, x, y);
        debugPoint(this.context, midpointX, midpointY)
    }

    this.context.stroke();
    this.points.push([x,y]);
  }
}

function debugPoint(context, x, y){
    context.fillStyle = "#ff0022";
    context.fillRect(x, y, 3, 3);
    context.stroke();
    console.log(x, y)
}

const foggy = new FoggyWindow();

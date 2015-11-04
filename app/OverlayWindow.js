import Debug from 'Debug';

export default class OverlayWindow {
    
    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        //// debug
        // document.querySelector('body').appendChild(this.canvas);
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        //// this.debug()
    }

    // generate clear parts given image data of unblurred image
    makeClear(unblurredImageData) {
        let data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data
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

        return this.canvas
    }

    debug(){
        this.debugger = new Debug();
        this.debugger.beginPath(this.context, 455,149)
        this.debugger.quadraticCurve(this.context, 455,149,455,147)
        this.debugger.quadraticCurve(this.context, 455,147,458,139)
        this.debugger.quadraticCurve(this.context, 458,139,480,114)
        this.debugger.quadraticCurve(this.context, 480,114,501,103)
        this.debugger.quadraticCurve(this.context, 501,103,507,101)
        this.debugger.quadraticCurve(this.context, 507,101,507,101)
        this.debugger.quadraticCurve(this.context, 507,101,514,100)
    }

}

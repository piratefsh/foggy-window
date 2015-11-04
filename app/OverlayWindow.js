
export default class OverlayWindow {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        //// debug
        //document.querySelector('body').appendChild(this.canvas);
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
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
}

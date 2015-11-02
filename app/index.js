import 'styles/style.scss' 
import StackBlur from 'stackblur-canvas'
import dock from 'images/dock.jpg'
class FoggyWindow {
    constructor(){
        // setup canvas
        this.canvas = document.querySelector('.foggy-window')

        this.context = this.canvas.getContext('2d')
        this.context.scale(window.devicePixelRatio/2, window.devicePixelRatio/2)

        // draw image
        this.scenery = new Image()
        this.scenery.src = dock 
        this.scenery.onload = () => {
            this.render()
        }

        window.onresize = () => this.render()
    }

    render(){

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        const imgAspectRatio = this.scenery.width/this.scenery.height
        const canvasAspectRatio = this.canvas.width/this.canvas.height
        
        let imgRenderHeight, imgRenderWidth, imgOffsetX, imgOffsetY

        if (canvasAspectRatio <= imgAspectRatio){ //canvas is skinnier than the image

            imgRenderWidth = this.canvas.height * imgAspectRatio
            imgRenderHeight = this.canvas.height

            //offset the x
            imgOffsetX = - (imgRenderWidth - this.canvas.width) / 2
            imgOffsetY = 0

        }else{ 

            imgRenderWidth = this.canvas.width
            imgRenderHeight = this.canvas.width / imgAspectRatio

            //offset the y
            imgOffsetX = 0
            imgOffsetY = - (imgRenderHeight - this.canvas.height) /2
        }
        
        this.context.drawImage(this.scenery, imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight)
        
        this.blur(8)

    }

    blur(radius){
        const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        const blurred = StackBlur.imageDataRGB(imageData, 0, 0, this.canvas.width, this.canvas.height, radius);
        this.context.putImageData(blurred, 0, 0 )
    }
}

const foggy = new FoggyWindow()

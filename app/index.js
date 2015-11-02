import 'styles/style.scss' 

class FoggyWindow {
    constructor(){
        // setup canvas
        this.canvas = document.querySelector('.foggy-window')

        this.context = this.canvas.getContext('2d')
        this.context.scale(window.devicePixelRatio/2, window.devicePixelRatio/2)

        // draw image
        this.scenery = new Image()
        //this.scenery.src = 'https://c1.staticflickr.com/1/653/22653732832_e08adc6b01_h.jpg'
        this.scenery.src = 'http://c2.staticflickr.com/6/5773/22682099011_04b9a83085_b.jpg'
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

    }
}

const foggy = new FoggyWindow()

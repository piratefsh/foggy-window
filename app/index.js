import 'styles/style.scss' 

class FoggyWindow {
    constructor(){
        // setup canvas
        this.canvas = document.querySelector('.foggy-window')

        this.context = this.canvas.getContext('2d')
        this.context.scale(window.devicePixelRatio/2, window.devicePixelRatio/2)

        // draw image
        this.scenery = new Image()
        this.scenery.src = 'https://c1.staticflickr.com/1/653/22653732832_e08adc6b01_h.jpg'
        this.scenery.onload = () => {
            this.render()
        }

        window.onresize = () => this.render()
    }

    render(){
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.context.drawImage(this.scenery, 0, 0, this.canvas.width, this.canvas.height)

    }
}

const foggy = new FoggyWindow()

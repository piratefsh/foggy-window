
export default class Debug{
    point(context, x, y) {
        context.fillStyle = '#ff0022';
        context.fillRect(x, y, 3, 3);
        context.stroke();
        this.log(x, y);
    }

    beginPath(context, x, y, thickness=35){
        context.strokeStyle = 'rgba(255, 0, 0, 0.1)'
        context.lineWidth = thickness
        context.lineCap = 'round'
        context.beginPath()
        context.moveTo(x, y)
    }
    quadraticCurve(context, x0, y0, x1, y1) {
        const midpointX = parseInt((x1 + x0) / 2);
        const midpointY = parseInt((y1 + y0) / 2);
        context.quadraticCurveTo(midpointX, midpointY, x1, y1);
        context.stroke()
    }

    log(){
        console.info.apply(console, arguments)
    }
}

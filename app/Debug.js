
export default class Debug{
    point(context, x, y) {
        context.fillStyle = '#ff0022';
        context.fillRect(x, y, 3, 3);
        context.stroke();
        console.log(x, y);
    }
}

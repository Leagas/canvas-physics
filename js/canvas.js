var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

const objects = [
    {
        s: 10,
        r: 1,
        x: 375,
        y: 375,
        a: 0,
    }
]

function paint() {
    // for (o of objects) {
    ctx.beginPath();
    ctx.arc(375, 375, 100, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(375, 375, 2, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill();
    ctx.beginPath()
    ctx.moveTo(275, 375)
    ctx.lineTo(475, 375)
    ctx.closePath()
    ctx.stroke()
    // }
}

function main() {
    // setInterval(() => {
    // ctx.clearRect(0,0, c.width, c.height)
    // paint()
    // }, 10)
    paint()
}

main()
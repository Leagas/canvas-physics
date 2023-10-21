var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

const line_length = (o, c) => Math.sqrt((o.x - c.x) ** 2 + (o.y - c.y) ** 2)
const force_angle = (o, c) => Math.atan2(o.x - c.x, o.y - c.y)
const radian_angle = (a) => a * (Math.PI / 180)
const cos = (a) => Math.cos(radian_angle(a));
const sin = (a) => Math.sin(radian_angle(a));
const tan = (a) => Math.tan(radian_angle(a));

const x = 250
const y = 250

function line(x, y, m, a) {
    const dx = x + m * Math.cos(radian_angle(a))
    const dy = y - m * Math.sin(radian_angle(a))
    ctx.beginPath();
    ctx.moveTo(x, y)
    ctx.lineTo(dx, dy)
    ctx.stroke()
    return { x: dx, y: dy }
}

function paint() {
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 100, 0, 2 * Math.PI);
    ctx.stroke();
    const r = line(x, y, 100, 0)
    line(r.x, r.y, 100, -90)
}

function main() {
    // setInterval(() => {
    ctx.clearRect(0, 0, c.width, c.height)
    paint()
    // }, 10)
}

main()
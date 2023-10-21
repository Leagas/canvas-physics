// https://www.geeksforgeeks.org/how-to-calculate-the-impact-force/
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

const line_length = (o, c) => Math.sqrt((o.x - c.x) ** 2 + (o.y - c.y) ** 2)
const force_angle = (o, c) => Math.atan2(o.x - c.x, o.y - c.y)
const radian_angle = (a) => a * (Math.PI / 180)
const cos = (a) => Math.cos(radian_angle(a));
const sin = (a) => Math.sin(radian_angle(a));
const tan = (a) => Math.tan(radian_angle(a));
const kinetic_energy = (m, v) => m / 2 * v ** 2
const energy_velocity = (ke, m) => Math.sqrt(ke / (m / 2))
const collision_velocity = (oi, oj, plane) => ((oi.m * oi[`v${plane}`]) + (oj.m * oj[`v${plane}`])) / (oi.m + oj.m)

class Particle {
    constructor(x, y, m, v, a) {
        this.x = x
        this.y = y
        this.m = m
        this.v = v
        this.a = a
        this.style = 'black'
    }

    update = () => {
        this.x += this.v/100 * cos(this.a)
        this.y -= this.v/100 * sin(this.a)
    }

    draw = () => {
        ctx.strokeStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.m, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
        ctx.stroke();
        line(this.x, this.y, 200, this.a)
    }
}

const objects = [
    new Particle(150, 200, 50, 100, 20),
]

function line(x, y, m, a) {
    const dx = x + m * Math.cos(radian_angle(a))
    const dy = y - m * Math.sin(radian_angle(a))
    ctx.beginPath();
    ctx.moveTo(x, y)
    ctx.lineTo(dx, dy)
    ctx.stroke()
    return { x: dx, y: dy }
}

function setup() {
    ctx.beginPath();
    ctx.moveTo(250, 0)
    ctx.lineTo(500, 250)
    ctx.stroke();
}

function draw() {
    for (o of objects) {
        o.draw()
    }
}

function update() {
    for (o of objects) {
        o.update()
    }
}

function find_collision() {
    const current = objects[0]
}

function main() {
    // setInterval(() => {
        ctx.clearRect(0, 0, c.width, c.height)
        setup()
        draw()
        update()
        // find_collision()
    // }, 10)
}

main()
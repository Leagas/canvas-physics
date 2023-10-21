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
    constructor(x, y, m, vx, vy) {
        this.x = x
        this.y = y
        this.m = m
        this.vx = vx
        this.vy = vy
        this.a = 0
        this.style = 'black'
    }

    stroke = (style) => {
        this.style = style
    }

    update = () => {
        this.x += this.vx / 100
        this.y += this.vy / 100
    }

    draw = () => {
        ctx.strokeStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.m, 0, 2 * Math.PI);
        ctx.fillText(`vx: ${Math.floor(this.vx)}`, this.x - 10, this.y - 5);
        ctx.fillText(`vy: ${Math.floor(this.vy)}`, this.x - 10, this.y + 5);
        ctx.stroke();
    }
}

const objects = [
    new Particle(200, 150, 50, 100, 70),
    new Particle(400, 250, 100, 0, 0)
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
    for (let i = 0; i <= objects.length - 1; i++) {
        const oi = objects[i]
        for (let j = i + 1; j <= objects.length - 1; j++) {
            const oj = objects[j]
            const d_ij = line_length(oi, oj)
            if (d_ij <= oi.m + oj.m) {
                const cvx = collision_velocity(oi, oj, 'x')
                const cvy = collision_velocity(oi, oj, 'y')
                oi.vx = cvx
                oi.vy = cvy
                oj.vx = cvx
                oj.vy = cvy
            }
        }
    }
}

function main() {
    setInterval(() => {
        ctx.clearRect(0, 0, c.width, c.height)
        draw()
        update()
        find_collision()
    }, 10)
}

main()
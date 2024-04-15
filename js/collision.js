var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

const line_length = (o, c) => Math.sqrt((o.x - c.x) ** 2 + (o.y - c.y) ** 2)
const force_angle = (o, c) => Math.atan2(o.x - c.x, o.y - c.y)
const d_radian = (a) => a * (Math.PI / 180)

const x = 250
const y = 250

function line(x, y, m, a) {
    const dx = x + m * Math.cos(d_radian(a))
    const dy = y - m * Math.sin(d_radian(a))
    ctx.beginPath();
    ctx.moveTo(x, y)
    ctx.lineTo(dx, dy)
    ctx.stroke()
    return { x: dx, y: dy }
}

function arc({ x, y, r }) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

const objects = [
    {
        x: 250,
        y: 250,
        r: 20,
        a: 0,
        s: 0
    },
    {
        x: 100,
        y: 200,
        r: 10,
        a: 0,
        s: 5
    }
]

const force = [
    {
        n: 'air',
        f: 0.98,
        a: 0
    },
    // {
    //     n: 'gravity',
    //     f: 0.98,
    //     a: -90
    // }
]

function collide(a, b) {
    const l = line_length(a,b) - (a.r)-(b.r)
    if (l <= 0) {
        const rel = a.x-b.x
        a.x += rel/20
    }
}

function update() {
    for (i in objects) {
        const c = objects[i]
        // own force
        c.x += c.s
        for (j in objects) {
            if (i !== j) {
                // other force
                const d = objects[j]
                collide(c,d)
            }
        }
        // universal force
        for (f of force) {
            c.s = c.s*f.f
        }
    }
}

function paint() {
    for (o of objects) {
        arc(o)
    }
}

function main() {
    setInterval(() => {
        ctx.clearRect(0, 0, c.width, c.height)
        paint()
        update()
    }, 10)
}

main()
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

const objects = [
    {
        x: 375,
        y: 375,
        s: 10,
        m: 0,
        r: 0,
        a: 1,
        name: 'a'
    },
    {
        x: 250,
        y: 500,
        s: 25,
        m: 200,
        r: 0,
        a: 0,
        name: 'b'
    }
]

const line_length = (o, c) => {
    return Math.sqrt((o.x-c.x)**2 + (o.y-c.y)**2)
}
const force_angle = (o, c) => Math.atan2(o.x-c.x, o.y-c.y) 

function rotation(c) {
    // for (o of objects) {
        const o = objects[1]
        if (c.name !== o.name) {
            const d = line_length(o, c)
            if (d < o.m) {
                const s = d > o.s*2 ? (d/o.m)/100 : 0
                return s ? s + force_angle(o,c)*-1 : c.r
            }
        }
        return c.r
    // }
}

function update() {
    // for (o of objects) {
        const o = objects[0]
        o.x += o.a * Math.cos(o.r)
        o.y += o.a * Math.sin(o.r)
        o.r = rotation(o)
        paint_vector(o)
    // }
}

function paint_vector(o) {
    ctx.beginPath();
    ctx.moveTo(o.x, o.y)
    const x = o.x + (20 * Math.cos(o.r))
    const y = o.y + (20 * Math.sin(o.r))
    ctx.lineTo(x, y)
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(o.x, o.y)
    const dx = (o.x-objects[1].x)/8
    const dy = (o.y-objects[1].y)/8
    ctx.lineTo(o.x-dx, o.y-dy)
    ctx.stroke();
}

function paint() {
    for (o of objects) {
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.s, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.m, 0, 2 * Math.PI);
        ctx.stroke();
        update()
    }
}

function main() {
    setInterval(() => {
        ctx.clearRect(0,0, c.width, c.height)
        paint()
    }, 10)
}

main()
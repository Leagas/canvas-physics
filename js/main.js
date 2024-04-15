const chalk = require('chalk');

const create_field = (w,h) => new Array(w).fill(0).map(i => new Array(h).fill(0)) 

// 9 x | 9 y
const field = create_field(29,29)

const objects = [    
    {
        p: [8, 8],
        e: ' A ',
        r: 0
    },
    {
        p: [14, 14],
        e: ' B ',
        r: 8
    },
    {
        p: [2, 2],
        e: ' D ',
        r: 2
    }
]

const magnitude = (x,y,o) => Math.floor(Math.sqrt(((x-o.p[1])**2)+((y-o.p[0])**2)))

function update(y, x) {
    y = Number(y)
    x = Number(x)
    for (o of objects) {
        const yl = o.p[0] - o.r
        const yu = o.p[0] + o.r
        const xl = o.p[1] - o.r
        const xu = o.p[1] + o.r
        if (y > yl && y < yu && x > xl && x < xu) {
            const v = magnitude(x,y,o)
            field[y][x] = o.r-v > 0 ? o.r-v : 0
        }
    }
}

function draw(y, x) {
    let draw = true
    for (o of objects) {
        if (y == o.p[0] && x == o.p[1]) {
            process.stdout.write(chalk.red(`${o.e}`))
            draw = false
            break;
        }
    }
    if (draw) {
        const v = field[y][x]
        process.stdout.write(v > 0 ? chalk.yellow(` ${v} `) : ` ${v} `)
    }
}

function calculate() {
    // for (o of objects) {
        const o = objects[0]
        let ys = o.p[0] - 1
        let xs = o.p[1] - 1
        let ye = o.p[0] + 1
        let xe = o.p[1] + 1
        let max = 0
        let pos = [0,0]
        for (yo = ys; yo <= ye; yo++) {
            for (xo = xs; xo <= xe; xo++) {
                if (field[yo][xo] > max && yo !== o.p[0] && xo !== o.p[1]) {
                    max = field[yo][xo]
                    pos = [yo,xo]
                }
            }
        }
        if (max > 0) {
            let cy = pos[0] - o.p[0]
            let cx = pos[1] - o.p[1]
            let m = objects.find(b => {
                return b.p[0] === o.p[0]+cy && b.p[1] === o.p[1]+cx
            })
            if (!m) {
                o.p[0] += cy
                o.p[1] += cx
            }
        }
    // }
}

function main() {
    setInterval(() => {
        console.clear()
        for (y in field) {
            for (x in field[y]) {
                update(y, x)
                draw(y, x)
            }
            process.stdout.write('\n')
        }
        calculate()
    }, 1000)
}

main()
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    canvas2 = document.getElementById('canvas2'),
    ctx2 = canvas2.getContext('2d'),
    // full screen dimensions
    cw = window.innerWidth,
    ch = window.innerHeight,
    // charArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    maxCharCount = 100,
    fallingCharArr = [],
    fontSize = 40,
    maxColums = 8;
// maxColums = cw / (fontSize);
canvas.width = canvas2.width = cw;
canvas.height = canvas2.height = ch;

canvas.fillStyle = 'rgb(213, 38, 29)'

let totalCount = 6
let drawTimeMillis = totalCount > 5 ? 500 : (totalCount < 3 ? 1500 : 1000)

let employeeId = ''
window.prizeName = '京东500元购物卡'


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    const rnd = Math.random() * (max - min) + min
    
    return rnd
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.draw = function (ctx) {

    // this.value = charArr[randomInt(0, charArr.length - 1)] //.toUpperCase();
    this.speed = randomFloat(1, 10);

    // 文字
    ctx2.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx2.font = fontSize + "px san-serif";
    ctx2.fillText(this.value || '0', this.x, this.y);
    // document.getElementById("information").innerHTML = this.value

    // 尾巴
    ctx.fillStyle = "rgba(255, 255, 255, .1)";
    ctx.font = fontSize + "px san-serif";
    ctx.fillText(this.value, this.x, this.y);

    this.y += this.speed;
    if (this.y > ch) {
        this.y = randomFloat(-100, 0);
        this.speed = randomFloat(2, 5);
    }

}

for (var i = 0; i < maxColums; i++) {
    fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
}


var animationNum = -1
var update = function () {

    // 背景色
    ctx.fillStyle = "rgba(213, 38, 29, 0)";
    ctx.fillRect(0, 0, cw, ch);

    ctx2.clearRect(0, 0, cw, ch)

    employeeId = generateEmployeeId()

    var i = fallingCharArr.length
    while (i--) {
        fallingCharArr[i].value = employeeId[i]
        // console.log(i, employeeId[i], fallingCharArr[i].value)
        fallingCharArr[i].draw(ctx);
        // var v = fallingCharArr[i];
    }

    animationNum = requestAnimationFrame(update);
}

const ouputWinner = (employeeId = '45004500', index, totalCount = 5) => {
    document.querySelector('.winners').innerHTML = document.querySelector('.winners').innerHTML + `<div class="employeeid">${employeeId}</div>`
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

let index = 0
async function drawWinner() {
    // ouputWinner(fallingCharArr.map(fcr => fcr.value).join(''), index, totalCount)
    ouputWinner(window.drawResults[index].id, index, totalCount)
    index++

    // await sleep(250)
    document.querySelector('#lucky-draw').removeAttribute('disabled')

}

function saveWinners(prizeName) {
    const winners = document.querySelector('.winners').innerText
    localStorage.setItem('winners', JSON.stringify({[prizeName]: winners}))
}

async function startToRunDraw(prizeName) {
    document.querySelector('#lucky-draw').setAttribute('disabled','disabled')
    setTimeout(async () => {
        await drawWinner()

        if (index < totalCount) {
            startToRunDraw()
            // animationNum = requestAnimationFrame(update);
        } else {
            console.log('done')
            cancelAnimationFrame(animationNum)

            saveWinners(window.prizeName)
        }
    }, drawTimeMillis)
}

window.drawResults = []
async function getDrawResult() {
    const res = await fetch('/draw')
    const results = await res.json()
    window.drawResults = results
}

async function initAndDraw() {
    index = 0
    document.querySelector('.winners').innerHTML = ''
    ctx.clearRect(0, 0, cw, ch)
    ctx2.clearRect(0, 0, cw, ch)

    // document.getElementById('winners').style.fontSize = `40px`
    // const top = document.getElementById('img-production').clientHeight/2 - (totalCount * 80 ) / 2

    update()
    await getDrawResult()
    startToRunDraw(prizeName)
}

/**
 * 随机生成employeeId
 * @returns 
 */
function generateEmployeeId() {
    // const prefix = "4";
    // const suffixLength = 7;
    // const digits = "0123456789";

    // let employeeId = "";
    // for (let i = 0; i < suffixLength; i++) {
    //     employeeId += digits[Math.floor(Math.random() * digits.length)];
    // }

    // return prefix + employeeId;

    const lng = window.employees.length
    const rand = Math.floor(Math.random() * lng)
    // console.log(window.employees, rand, window.employees[rand])
    const id = window.employees[rand].id
    // console.log(id)
    return id.toString()
}


window.employees = []
/**
 * get all employees
 * @returns 
 */
async function generateEmployees() {
    const res = await fetch('/employees')
    const es = await res.json()

    window.employees = es

    // return employees

}

generateEmployees()
// console.log(window.employees)

// update();
// startToRunDraw();
// initAndDraw()



async function updateDrawType() {
    const res = await fetch('/current')
    const drawType = await res.json()
    // console.log(drawType)

    const {count, img, name} = drawType
    window.prizeName = name
    document.getElementById('draw-name').innerText = name
    document.getElementById('img-production').src = `./productions/${img}`
    totalCount = count
    drawTimeMillis = totalCount > 5 ? 500 : (totalCount < 3 ? 1500 : 1000)
}

setInterval(updateDrawType, 10000)
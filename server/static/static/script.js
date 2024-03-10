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

const totalCount = 6
const drawTimeMillis = totalCount > 5 ? 500 : (totalCount < 3 ? 1500 : 1000)

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

    var i = fallingCharArr.length;
    while (i--) {
        fallingCharArr[i].value = employeeId[i]
        fallingCharArr[i].draw(ctx);
        var v = fallingCharArr[i];
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
    ouputWinner(fallingCharArr.map(fcr => fcr.value).join(''), index, totalCount)
    index++

    await sleep(250)
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
            cancelAnimationFrame(animationNum)

            saveWinners(window.prizeName)
        }
    }, drawTimeMillis)
}

function initAndDraw() {
    index = 0
    document.querySelector('.winners').innerHTML = ''
    ctx.clearRect(0, 0, cw, ch)
    ctx2.clearRect(0, 0, cw, ch)

    // fallingCharArr = []
    // for (var i = 0; i < maxColums; i++) {
    //     fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
    // }
    
    //document.getElementById('img-production').clientHeight
    document.getElementById('winners').style.fontSize = `40px`
    const top = document.getElementById('img-production').clientHeight/2 - (totalCount * 80 ) / 2
    // const top = (totalCount * 50) / 2
    // document.getElementById('winners').style.top = `calc(8vh + ${top}px)`
    // document.getElementById('winners').style.top = '8vh'

    update()
    startToRunDraw(prizeName)
}

/**
 * 随机生成employeeId
 * @returns 
 */
function generateEmployeeId() {
    const prefix = "4";
    const suffixLength = 7;
    const digits = "0123456789";

    let employeeId = "";
    for (let i = 0; i < suffixLength; i++) {
        employeeId += digits[Math.floor(Math.random() * digits.length)];
    }

    return prefix + employeeId;
}

/**
 * 随机生成若干个employeeId
 * @param {number of employeeIds} count 
 * @returns 
 */
function generateEmployees(count) {
    const employees = [];
    for (let i = 0; i < count; i++) {
        employees.push(generateEmployeeId());
    }

    return employees;
}

const employees = generateEmployees(1000)

// update();
// startToRunDraw();
// initAndDraw()







async function updateDrawType() {
    const res = fetch('/current')
    const drawType = await res.json()
    console.log(drawType)
}

// setInterval(updateDrawType, 1000)
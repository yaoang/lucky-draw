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
let drawTimeMillis = getDrawTimeMillis()

function getDrawTimeMillis() {
    return totalCount > 5 ? 800 : (totalCount >= 3 ? 2000 : totalCount === 2 ? 3000 : 4000)
}

let employeeId = ''
window.prizeName = ''
window.drawType = ''


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
/**
 * to draw random user list
 */
var update = function () {

    // 背景色
    ctx.fillStyle = "rgba(213, 38, 29, 0)";
    ctx.fillRect(0, 0, cw, ch);

    employeeId = generateEmployeeId()
    drawEmployeeIdInList(employeeId)

    animationNum = requestAnimationFrame(update);
}

/**
 * draw a employeeid in random list
 */
function drawEmployeeIdInList(employeeId) {
    
    ctx2.clearRect(0, 0, cw, ch)

    var i = fallingCharArr.length
    while (i--) {
        console.log(`i=`, i, 'employeeId[i]=', employeeId[i])
        fallingCharArr[i].value = employeeId[i]
        fallingCharArr[i].draw(ctx);
    }
    // console.log(`employeeId=`, employeeId, 'fallingCharArr=', fallingCharArr)
}

const ouputWinner = (employeeId, index, totalCount = 5) => {
    drawEmployeeIdInList(employeeId.toString())
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
    localStorage.setItem('winners', JSON.stringify({ [prizeName]: winners }))
}

/**
 * to output all winners and cancel animation
 * @param {*} prizeName 
 */
async function startToRunDraw(prizeName) {
    document.querySelector('#lucky-draw').setAttribute('disabled', 'disabled')
    setTimeout(async () => {
        await drawWinner()

        if (index < totalCount) {
            startToRunDraw()
            // animationNum = requestAnimationFrame(update);
        } else {
            cancelAnimationFrame(animationNum)
            // console.log(window.drawResults[index-1].id)
            // drawEmployeeIdInList(window.drawResults[index-1].id.toString())

            saveWinners(window.prizeName)
        }
    }, drawTimeMillis)
}

window.drawResults = []
/**
 * get draw result from api
 */
async function getDrawResult() {
    const res = await fetch('/draw')
    const results = await res.json()
    window.drawResults = results
}

async function initAndDraw() {

    if(window.drawType === 'ygpz' || window.drawType === 'reshen') {
        return startToRndTableNo()
    }

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

async function updateDrawType() {
    const res = await fetch('/current')
    const drawType = await res.json()
    // console.log(drawType)

    const { count, img, name, drawType: dt } = drawType
    if (window.prizeName !== name) {
        window.prizeName = name
        window.drawType = dt
        document.getElementById('draw-name').innerText = name
        document.getElementById('img-production').src = `./productions/${img}`
        totalCount = count
        drawTimeMillis = getDrawTimeMillis()
        document.getElementById('winners').innerHTML = ''

        if (dt === 'ygpz' || dt === 'reshen') {
            document.querySelector('.winners').style.display = 'none'
            document.querySelector('.table-no').style.display = ''
        } else {
            document.querySelector('.winners').style.display = ''
            document.querySelector('.table-no').style.display = 'none'
        }
    }
}

setInterval(updpateInformations, 1000)



// for table no random luck draw
var maxTableNo = 127
var maxSeatNo = 12
var tableNo = 'NO. 000_'
var tableNoLng = 0
var rndCount = 0
var seats = []
var tables = []
function reduceText() {
    setTimeout(() => {
        tableNoLng --
        document.getElementById('table-no').innerText = document.getElementById('table-no').innerText.substr(0, tableNoLng) + '_'

        // console.log(document.getElementById('table-no').innerText.length-2, tableNoLng)
        if(tableNoLng > 'TABLE'.length) {
            return reduceText()
        }

        rndTableNo()
    }, 200)
}

function startToRndTableNo() {
    tableNoLng = document.getElementById('table-no').innerText.length - 1
    // document.getElementById('table-no').innerText = tableNo
    rndCount = 0
    reduceText()
}

function rndTableNo() {
    setTimeout(async () => {
        const maxNo = window.drawType === 'ygpz' ? maxTableNo : maxSeatNo
        const no = (Math.floor(Math.random() * maxNo) + 1).toString()
        document.getElementById('table-no').innerHTML = 'NO. ' + ('000'.substr(0, 3 - no.length) + no) + ( rndCount % 5 == 1 ? '&nbsp;' : '_')

        rndCount ++
        if(rndCount < 20) {
            return rndTableNo()
        }

        if(window.drawType === 'ygpz') {
            // exclude numbers in tables
            if(tables.includes(no)) {
                return rndTableNo()
            }
        }

        if(window.drawType === 'reshen') {
            if(seats.length === 12) {
                return '0'
            }
            // exclude numbers in seats
            if(seats.includes(no)) {
                return rndTableNo()
            }
        }

        return await saveTableNo(no)
    }, 100)
}

async function saveTableNo(no) {
    // const tableNo = document.querySelector('.table-no').innerText

    window.drawType === 'ygpz' ? tables.push(no) : seats.push(no)

    localStorage.setItem( window.drawType === 'ygpz' ? 'tableNo' : 'seatNo', JSON.stringify(window.drawType === 'ygpz' ? tables : seats) )

    if(window.drawType === 'ygpz') {
        const res = await fetch('/saveTables', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tables
            })
        })
    }

    if(window.drawType === 'reshen') {
        const res = await fetch('/saveSeats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                seats
            })
        })
    }
}

async function getTableCount() {
    const res = await fetch('./tableCount')
    const data = await res.json()
    const {tableCount} = data
    maxTableNo = tableCount
}

function updpateInformations () {

    updateDrawType()
    getTableCount()
}

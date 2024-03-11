
let totalCount = 6
let drawTimeMillis = totalCount > 5 ? 500 : (totalCount < 3 ? 1500 : 1000)

let employeeId = ''
window.prizeName = '100元购物卡'


async function updateDrawType() {
    const res = await fetch('/current')
    const drawType = await res.json()
    // console.log(drawType)

    const { count, img, name } = drawType
    if (window.prizeName !== name) {
        window.prizeName = name
        document.getElementById('draw-name').innerText = name
        document.getElementById('img-production').src = `./productions/${img}`
        totalCount = count
        drawTimeMillis = totalCount > 5 ? 500 : (totalCount < 3 ? 1500 : 1000)
        document.getElementById('winners').innerHTML = ''
    }
}

setInterval(updateDrawType, 1000)


// for table no random luck draw
var maxTableNo = 127
var tableNo = 'TABLE_'
var tableNoLng = 0
var rndCount = 0
function reduceText() {
    setTimeout(() => {
        tableNoLng --
        document.getElementById('table-no').innerText = document.getElementById('table-no').innerText.substr(0, tableNoLng) + '_'

        console.log(document.getElementById('table-no').innerText.length-2, tableNoLng)
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
    setTimeout(() => {
        const no = (Math.floor(Math.random() * maxTableNo) + 1).toString()
        document.getElementById('table-no').innerHTML = 'TABLE ' + ('000'.substr(0, 3 - no.length) + no) + ( rndCount % 5 == 1 ? '&nbsp;' : '_')

        rndCount ++
        if(rndCount < 20) {
            return rndTableNo()
        }

        return saveTableNo()
    }, 100)
}

function saveTableNo() {
    const tableNo = document.querySelector('.table-no').innerText
    localStorage.setItem('tableNo', JSON.stringify({ tableNo }))
}

import express from 'express'
import xlsx from 'xlsx'
import multer from 'multer'
import fs from 'node:fs'
import {GIFTS, TURNS, getGift} from './gift.mjs'
import bodyParser from 'body-parser'
import json2csv from 'json2csv'
// import path from 'node:path'

const app = express()
const port = 3000

// Store the list of employees who have won
let winners = []
// Store the uploaded excel data
let employeeData = []

let drawType = 'ygpz'
let tableCount = 127

// Set up file upload middleware, limiting file size to 5 MB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/allDrawTypes', function (req, res) {
    return res.json(GIFTS)
})

app.get('/getTurnsAndGifts', function(req, res) {
    const result = TURNS.map(t => {
        const tmp = {}
        Object.keys(t).forEach(key => {
            if(key === 'name') {
                tmp.name = t[key]
                return
            }
            t[key].forEach(g => {
                tmp[key] = t[key].map(g => ({...GIFTS[g], key: g}))
            })
        })
        // tmp.name = t.name
        return tmp
    })
    return res.json(result)
})

// set draw type
app.post('/setDrawType', (req, res) => {
    const { drawType: dt } = req.body

    console.log('new drawType = ' + dt)
    drawType = dt
    return res.json({result:'success', drawType: getGift(dt)})
})

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    const fileBuffer = req.file.buffer
    const fileSize = req.file.size

    if (fileSize > 5 * 1024 * 1024) {
        return res.status(400).json({ success: false, message: 'File size exceeds 5MB limit.' })
    }

    try {
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        employeeData = xlsx.utils.sheet_to_json(worksheet)
        res.json({ success: true, data: employeeData })
    } catch (error) {
        console.error('Error parsing file:', error)
        res.status(500).json({ success: false, message: 'Error parsing file.' })
    }
})

// Draw logic
app.get('/draw', (req, res) => {
    return drawWinners(req, res, drawType !== 'ygpz')
})

// current draw type object
app.get('/current', (req, res) => {
    return res.json(Object.assign({ drawType }, getGift(drawType)))
})

app.post('/updateDrawCount', (req, res) => {
    const { count } = req.body
    const dt = getGift(drawType)
    dt.count = count
    return res.json({ success: true, drawType: dt})
})

// Draw logic without excluding winners
app.get('/drawWithoutExclude', (req, res) => {
    return drawWinners(req, res, false)
})

// get all employees
app.get('/employees', (req, res) => {
    return res.json(employeeData)
})

/**
 * to save lucky draw data of ygpz
 */
app.post('/saveTables', (req, res) => {{
    const { tables } = req.body
    fs.writeFileSync('tables.json', JSON.stringify(tables))
}})

/**
 * to save lucky draw data of reshen
 */
app.post('/saveSeats', (req, res) => {{
    const { seats } = req.body
    fs.writeFileSync('seats.json', JSON.stringify(seats))
}})

// static dir
app.use(express.static('static'))

// Get the list of eligible employees for drawing
function getEligibleEmployees(excludeWinners) {
    if (excludeWinners) {
        return employeeData.filter(employee => {
            // Exclude winners with drawType 'draw'
            return !winners.some(winner => winner.drawType !== 'ygpz' && winner.id === employee.id)
        })
    }

    return employeeData.filter(employee => {
        return !winners.some(winner => winner.drawType === 'ygpz' && winner.id === employee.id)
    })
}

// Draw logic
function drawWinners(req, res, isExlucde = true) {
    const eligibleEmployees = getEligibleEmployees(isExlucde)
    console.log('is exclude = ', isExlucde, 'length of winners = ', winners.length, ' lng of eligibleEmployees = ', eligibleEmployees.length)

    if (eligibleEmployees.length === 0) {
        return res.json({ success: false, message: 'No eligible employees left for the draw.' })
    }

    const gift = getGift(drawType)
    const number = gift.count
    console.log(`DrawType = ${drawType}, Draw number = ${number}, employees length = ${eligibleEmployees.length}`)
    const numWinners = parseInt(req.query.numWinners) || number

    if (numWinners < 1) {
        return res.json({ success: false, message: 'Invalid number of winners.' })
    }

    const randomWinners = []
    for (let i = 0; i < numWinners; i++) {
        const randomIndex = Math.floor(Math.random() * eligibleEmployees.length)
        const winner = isExlucde ? eligibleEmployees.splice(randomIndex, 1)[0] : eligibleEmployees[randomIndex]
        randomWinners.push(winner)
        winners.push({ id: winner.id, drawType: drawType }) // Add winner to winners list
        console.log(`isExclude=${isExlucde}, randomIndex=${randomIndex}, Winner: ${winner.id}, lng of winners= ${winners.length}`)
    }

    const drawResult = {
        dateTime: new Date().toISOString(),
        winners: randomWinners.map(winner => winner.id),
        drawType: drawType,
        prizeName: GIFTS[drawType].name
    }
    saveDrawResult(drawResult)

    return res.json(randomWinners)
}

app.post('/saveDraw', async (req, res) => {
    const body = req.body
    const {drawResult} = body
    saveDrawResult(drawResult)
    return res.json({ success: true, message: 'Draw result saved successfully.' })
})

function saveDrawResult (drawResult) {
    const drawResults = fs.existsSync('draw.json') ? JSON.parse(fs.readFileSync('draw.json', 'utf-8')) : []
    drawResults.push(drawResult)
    fs.writeFileSync('draw.json', JSON.stringify(drawResults, null, 2))
}

// Query winning results
app.get('/result/winners', (req, res) => {
    const drawResults = fs.existsSync('draw.json') ? JSON.parse(fs.readFileSync('draw.json', 'utf-8')) : []
    res.json(drawResults)
})

/**
 * query lucky draw result for ygpz
 */
app.get('/result/ygpz', (req, res) => {
    const drawResults = fs.existsSync('tables.json') ? JSON.parse(fs.readFileSync('tables.json', 'utf-8')) : []
    res.json(drawResults)
})

/**
 * query lucky draw for reshen
 */
app.get('/result/reshen', (req, res) => {
    const drawResults = fs.existsSync('seats.json') ? JSON.parse(fs.readFileSync('seats.json', 'utf-8')) : []
    res.json(drawResults)
})

/**
 * query winning results as csv
 */
app.get('/result/csv', (req, res) => {
    const drawResults = fs.existsSync('draw.json') ? JSON.parse(fs.readFileSync('draw.json', 'utf-8')) : []
    const csv = json2csv.parse(drawResults)
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="draw-results.csv"')
    return res.send(csv)
})

app.post('/saveTableCount', (req, res) => {
    const body = req.body
    const {tc} = body
    tableCount = tc
    return res.json({success: true, tableCount})
})

app.get('/tableCount', (req, res) => {
    return res.json({tableCount})
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

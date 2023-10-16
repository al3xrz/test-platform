const express = require('express')
const cors = require('cors')
const fs = require('fs')
const { uuid } = require('uuidv4')


const app = express()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.end('<h1>TEST</h1>')
})


app.delete('/log', (req, res) => {
    fs.writeFile('./log.txt', JSON.stringify([]), e=> {
        if(e) {
            console.log(e)
        } else {
            res.status(200).json({payload : []})
        }
    })
})


app.post('/log', (req, res) => {
    const message = req.body.message
    fs.readFile('./log.txt', (err, data) => {
        const info = JSON.parse(data)
        console.log(info)
        info.push({ id: uuid(), timestamp: Date.now(), message })
        fs.writeFile('./log.txt', JSON.stringify(info), e => {
            if (e) {
                console.log(e)
                res.status(500).json({ message: "внутренняя ошибка" })
            } else {
                res.status(200).json({ payload: info })
            }
        })
    })
})

app.get('/log', (req, res) => {
    fs.readFile('./log.txt', (err, data) => {
        res.status(200).json({ payload: JSON.parse(data) })
    })
})




app.listen(5000, () => {
    console.log('Server started!')
})
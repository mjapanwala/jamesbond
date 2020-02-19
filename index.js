const express = require('express')
const app = express()
const port = 3000
const database = require('./public/database.json')
const fs = require('fs')

const bodyParser = require('body-parser')


app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.sendFile(__dirname + '/public/views/index.html')) 
app.get('/contact', (req, res) => res.sendFile(__dirname + '/public/views/Contact.html'))
app.get('/portfolio', (req, res) => res.sendFile(__dirname + '/public/views/Portfolio.html'))
app.get('/resume', (req, res) => res.sendFile(__dirname + '/public/views/Resume.html'))

app.post('/save', (req, res) => {
    if (req.body){        
        console.log(database)
        console.log(req.body)
        console.log(Array.isArray(database))
        const new_posts = database.push(req.body)
        console.log(new_posts)
        fs.writeFile(`${__dirname + '/public/database.json'}`, JSON.stringify(new_posts), (err) => {
            if (err) {
                console.log(err)
                return res.status(400).send('Bad Request')
            } else {
                console.log('The file has been saved!');
                return res.status(200).send('success')
            }
            
        });
    } else {
        res.status(400).send('Bad Request')
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


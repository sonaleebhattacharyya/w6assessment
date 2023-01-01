const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
require('dotenv').config();
const {ROLLBAR_TOKEN} = process.env
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

app.use(express.json())
app.use(cors())

// I think this is the middleware and/or endpoints that will serve the files from the public folder. 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html')) 
    rollbar.log("string")
})
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/styles.css')) 
})

// adding a route so that the website calls the correct file (main.js)
app.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/main.js')) 
})

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(bots)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        rollbar.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        rollbar.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        rollbar.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        rollbar.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})
app.use(express.static(`${__dirname}/public`))
app.listen(4000, () => {
  console.log(`Listening on 4000`)
})


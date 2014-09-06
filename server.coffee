'use strict'

express = require 'express'
path = require 'path'


app = express()

route = require './route'
# app.set('views', path.join(__dirname, 'views'))

app.set 'views', path.join __dirname, 'views'
app.set 'view engine', 'jade'

app.use '/', route

module.exports = app

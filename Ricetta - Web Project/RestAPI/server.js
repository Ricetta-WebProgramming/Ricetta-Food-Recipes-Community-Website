var express = require('express')
app = express()
port = process.env.PORT || 5000
mongoose = require('mongoose')

Recipe = require('./api/models/recipeModel')
Comments = require('./api/models/recipeModel')
Like = require('./api/models/recipeModel')

bodyParser = require('body-parser')
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://ricettaUser:055065296@ricetta1.yhxit.mongodb.net/RicettaDb?retryWrites=true&w=majority', function(error){
    if(error) throw error
    console.log('Successfully connected');
})

const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var routes = require('./api/routes/recipeRoutes')
routes(app)

app.listen(port)

console.log('Recipe List started on : '+ port)
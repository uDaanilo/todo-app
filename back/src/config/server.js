const bodyParser = require("body-parser")
const app = require('express')()
const allowCors = require('./cors')

const PORT = 3003

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(allowCors)

app.listen(PORT, () => {
   console.log(`Listening on ${PORT}`)
})

module.exports = app
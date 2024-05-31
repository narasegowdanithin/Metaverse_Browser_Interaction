//imports
const express = require('express')
const app = express()
const port =3000

//static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/jsonData', express.static(__dirname + 'public/jsonData'))

//Set Views
//app.set('views', './views')
//app.set('view engine',ejs)

app.get('',(req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/mid',(req, res) => {
  res.sendFile(__dirname + '/views/indexMid.html')
})

app.get('/wojs',(req, res) => {
  res.sendFile(__dirname + '/views/newwo.html')
})

app.get('/ws.js',(req, res) => {
  res.sendFile(__dirname + '/public/js/ws.js')
})

//app.get('/about',(req, res) => {
  //  res.sendFile(__dirname + '/views/about.html')
//})

//Listen on port 3000
app.listen(port,()=>console.info(`Listening on port ${port}`))
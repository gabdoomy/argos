const express = require('express')
const app = express()
// const request = require('request')
var fs = require('fs');

app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

app.get('/api/data', (req,res) => {
  // res.send(require('./payload.JSON'))
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.parse(fs.readFileSync('./payload.JSON', 'utf8')));

})

app.listen(8081, () => console.log('backend service running🤓'))


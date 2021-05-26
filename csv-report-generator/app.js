const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const helper = require('./helpers.js');
const bodyParser = require('body-parser');

app.use(express.static('./'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    fs.readFile('./index.html', 'utf8', (err, result)=>{
      if (err) throw err;
      console.log(req.url, req.body)
      res.end(result);
    })
})

app.post('/', (req, res) => {
  var obj = req.body;

  var colNames = helper.getFields(obj).join(',');
  var rows = helper.getVals(obj, colNames).join('');
  var result = colNames + '\n' + rows;

  fs.writeFile('./result.csv', result, (err, result)=>{
    if (err){
      throw err;
      res.status(500).send();
    }
    res.download('./result.csv');
  })
});


app.listen(3000, ()=>
    console.log('Example app listening at http://localhost:3000')
);

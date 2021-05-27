const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'miniAppThree'
});

app.use(express.static('public'));
app.use(upload.array());

app.get('/', (req, res)=>{
  // res.end('hello');
  res.end('test');
})

app.post('/create', (req, res)=>{
  var query = 'insert into users (account, addr, credit) values ("n/a","n/a","n/a")';
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.end(result.insertId.toString());
  })
})

app.put('/account', (req, res)=>{
  console.log(req.body, req.headers);
  var query =  `update users set account = '${Object.values(req.body).join('%')}' where id = ${req.headers.session}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.end(req.headers.session);
    }
  })

})

app.put('/address', (req, res)=>{
  var query =  `update users set addr = '${Object.values(req.body).join('%')}' where id = ${req.headers.session}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.end(req.headers.session);
    }
  })
})

app.put('/cc', (req, res)=>{
  var query =  `update users set credit = '${Object.values(req.body).join('%')}' where id = ${req.headers.session}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.end(req.headers.session);
    }
  })
})

app.get('/overview', (req, res)=>{
  var query =  `select * from users where id = ${req.headers.session}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log('waddup');
      res.set('Content-Type', 'application/json')
      res.end(JSON.stringify(result[0]));
    }
  })
})

app.listen('3000', (err, success)=>{
  if (err) throw err;
  console.log('Listening on port: 3000');
})
const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = require('./helpers/connection.js');
const queryDb = require('./helpers/query.js');

const app = express()
const port = process.env.PORT

// mysql credentials
const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const table = process.env.TABLE;
const tableAttribute = process.env.TABLEATTRIBUTE;
const query = `SELECT * FROM ${table}`;

const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());
//app.listen(port, () => console.log(`Server is running on port: ${port}!`))

app.get('/', (req, res) => res.send('Hi!'))

app.get('/list', async (req, res) => {
  const con = await connection({host, user, password, database,}).catch(e => {})
  const results = await queryDb(con, query).catch(console.log);
  res.json({ results });
})

app.post('/', async (req, res) => {
  console.log(req.body);

  const fortune = req.body['fortune'];
  const insert = `INSERT INTO ${table}(${tableAttribute}) VALUE('${fortune}')`
  const con = await connection({host, user, password, database}).catch(e => {})
  const results = await queryDb(con, insert).catch(console.log);
 
  res.json({ results });
});

const https = require("https");
const options = {
  key: process.env.SERVER_KEY,
  cert: process.env.SERVER_CERT,
};
  
https.createServer(options, app)
  .listen(port, function (req, res) {
     console.log(`Server is running on port: ${port}!`);
  });

console.log(`key: ${process.env.SERVER_KEY}`);
console.log(`cert: ${process.env.SERVER_CERT}`);

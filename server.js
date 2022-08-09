const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = require('./helpers/connection.js');
const queryDb = require('./helpers/query.js');

const app = express()
const port = 3000

// mysql credentials
const sqlCred = require('./dbConfig.js');
const host = sqlCred.host;
const user = sqlCred.user;
const password = sqlCred.password;
const database = sqlCred.database;
const query = "SELECT * FROM fortunes";

app.use(bodyParser.json());
app.listen(port, () => console.log(`Server is running on port: ${port}!`))


//const con = mysql.createConnection({
//  host, user, password, database,
//});



app.get('/', (req, res) => res.send('Hi!'))


app.get('/list', async (req, res) => {
  const con = await connection({host, user, password, database,}).catch(e => {})
  const results = await queryDb(con, query).catch(console.log);
  res.json({ results });
})


app.post('/', async (req, res) => {
  console.log(req.body);

  const fortune = req.body['fortune'];
  const insert = `INSERT INTO fortunes(fortune) VALUE('${fortune}')`
  const con = await connection({host, user, password, database,}).catch(e => {})
  const results = await queryDb(con, insert).catch(console.log);
 
  res.json({ results });
});


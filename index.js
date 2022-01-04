const express = require("express");
const app = express();
app.use(express.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '10.96.0.57', 
     user:'root', 
     password: 'password',
     database: 'leaderboard'
});

let conn
const getConn = async () => {
    console.log("Oueeeeeee");
    try {
        conn = await pool.getConnection()
        let sql = `CREATE TABLE IF NOT EXISTS leaderboard (id MEDIUMINT NOT NULL AUTO_INCREMENT, pseudo VARCHAR(255), time FLOAT, PRIMARY KEY (id))`
        let result = await conn.query(sql)
        console.log(result)
    } catch (error) {
        throw error
    }
} 

getConn()


app.get('/getScoreBoard', async (req,res) => {
    let sql = `SELECT * FROM leaderboard ORDER BY time ASC LIMIT 5`
    let result = await conn.query(sql)
    res.send(result)
})

app.post('/addScore', async (req,res) => {
    console.log(req.body);
    let timeReplaced = req.body.timer.replace(",", ".");
    let sql = `INSERT INTO leaderboard (pseudo, time) VALUES ('${req.body.pseudo}','${timeReplaced}')`
    let result = await conn.query(sql)
    console.log(result)
    res.send(200)
})

//Middleware
app.listen(8000, () => {
  console.log("Serveur à l'écoute");
});

const express = require("express");
const app = express();
app.use(express.json());

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'mariadb', 
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
    let sql = `INSERT INTO leaderboard (pseudo, time) VALUES ('${req.body.pseudo}','${req.body.timer}')`
    let result = await conn.query(sql)
    console.log(result)
    res.send(200)
})

//Middleware
app.listen(8000, () => {
  console.log("Serveur à l'écoute");
});

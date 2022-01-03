const express = require("express");
const app = express();

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
    
        let sql = `CREATE TABLE IF NOT EXISTS leaderboard (pseudo VARCHAR(255), time FLOAT)`
        let result = await conn.query(sql)
        console.log(result)
  
    } catch (error) {
        throw error
    }
} 

getConn()

//Middleware
app.use(express.json());

app.listen(8000, () => {
  console.log("Serveur à l'écoute");
});

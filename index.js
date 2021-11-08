const express = require('express')
const app = express()

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

rdv = [{
    // patient_name : "Tom",
    date : "02/24/2021 07:06:02 PM"
},
{
    // patient_name : "Hugo",
    date : "02/09/2021 10:42:27 AM"
},
{
    // patient_name : "Samuel",
    date : "07/28/2021 03:02:57 AM"
}]

app.get('/rdv', (req,res) => {
    console.log("rdv list");
    res.send(rdv)
})
app.get('/rdv-random', (req,res) => {
    console.log("rdv random");
    res.send(rdv[getRandomInt(3)])
})

app.listen(3000, () => {
    console.log("Serveur à l'écoute")
})
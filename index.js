const express = require("express");
const app = express();
const leaderboard = require("./leaderboard.json");

//Middleware
app.use(express.json());

app.get("/lb", (req, res) => {
  console.log("rdv list");
  res.status(200).json(leaderboard);
});

app.get('/lb/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const player = leaderboard.find(player => player.id === id)
    res.status(200).json(player)
})

app.post('/lb', (req,res) => {
    leaderboard.push(req.body)
    res.status(200).json(leaderboard)
})

app.listen(8000, () => {
  console.log("Serveur à l'écoute");
});

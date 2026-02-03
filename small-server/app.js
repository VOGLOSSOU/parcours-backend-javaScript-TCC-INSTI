require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors") 
const { initDb } = require("./db/sequelize")
const createProfile = require("./routes/profile/createProfile")
const app = express()
const port = 3000


// Middleware
app
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(cors()) // Activation de CORS avec les paramètres par défaut

// Initialisation de la base de données
initDb().then(() => {
  console.log('bonnnnnnnnnnnn...');

});

// Routes
require("./routes/profile/createProfile")(app)

app.get("/", (req, res) => {
  res.json({ message: "L' api marche !" })
})


app.listen(port, () => {
  console.log(`Notre app tourne sur le port ${port}`)
})
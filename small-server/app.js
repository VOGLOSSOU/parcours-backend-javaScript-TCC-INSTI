const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initDb } = require("./db/sequelize");
const app = express();
const port = 3000;

// Middleware
app.use(morgan("dev")).use(bodyParser.json()).use(cors()); // Activation de CORS avec les paramètres par défaut

// Initialisation de la base de données
initDb().then(() => {
  console.log("bonnnnnnnnnnnn...");
});

// Routes
require("./routes/profile/createProfile")(app);
require("./routes/profile/getAllProfiles")(app);

app.get("/", (req, res) => {
  res.json({ message: "L' api marche !" });
});

// serveur 2 :

const app2 = express();

const port2 = 4000;

app2.get("/apropos", (req, res) => {
  res.send("Deuxieme serveur avec port 4000");
});

app2.listen(port2, () => {
  console.log(`Serveur 2 lancé sur le port : ${port2}`);
});

// Démarrage du serveur principal
app.listen(port, () => {
  console.log(`Serveur API lancé sur le port : ${port}`);
});

/// app.method(path, handler)

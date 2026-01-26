const express = require('express')
const app = express();
const port = 3000

app.get('/index', (req, res) => {
  res.send('TCC INSTI hshshsh sgsgsssssss')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// serveur 2 :

const app2 = express();

const port2 = 4000;

app2.get('/apropos', (req, res) => {
  res.send('Deuxieme serveur avec port 4000');
});


app2.listen(port2, () => {
  console.log(`Serveur 2 lancé sur le port : ${port2}`);
})

/// app.method(path, handler)
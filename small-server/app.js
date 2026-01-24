const express = require('express')
const app = express()
const port = 3000

app.get('/index', (req, res) => {
  res.send('TCC INSTI hshshsh sgsgsssssss')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/// app.method(path, handler)
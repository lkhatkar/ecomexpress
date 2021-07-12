require('dotenv').config()
const express = require('express')
const routes = require('./src/ecomexpress.api');
const app = express()
const port = process.env.PORT || 3000;

app.use('/api', routes);

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
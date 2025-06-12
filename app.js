import express from 'express';
import bodyParser from 'body-parser';
const app = express()

const port = 3355;

// middleware
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
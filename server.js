const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const fetch = require('node-fetch');
const recipeRouter = require('./routes/recipe')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(__dirname + '/public'));

app.use('/', recipeRouter);
app.set("view engine", "hbs");


app.get('/', async (req, res) => {
  res.render('index.hbs')
})


app.listen(port, () => {
  console.log("Server status - 200");
});

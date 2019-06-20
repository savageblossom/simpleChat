  const bodyParser = require("body-parser");
  const express = require("express");
  const app = express();
  const database = require("./database");

  app.use(bodyParser.urlencoded({ extended: false }));
  app.get('/', (req, res) => {

    var promise = new Promise((resolve, reject) => {
      resolve(database.refresh());
    }).then(function(data){
      name = data;
      res.render(`${__dirname}/index.ejs`, {name: name});
    })
  });

  app.post('/getData', (req, res) => {
    const data = req.body.data;
    database.sendMessage(data);
  });

  app.get('/refresh', (req, res) => {
    var result = "asdas";
    res.render(__dirname + "index.ejs", {name: result});
  });

  app.listen(3000, () => {
    console.log("Started on http://localhost:3000");
  });

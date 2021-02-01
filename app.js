const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 7777

var app = express();
app.use(express.static(path.join(__dirname,'/public')));

app.use(bodyParser.json());


app.post('/signin', function (req, res) {
  var email=req.body.email;
  var password=req.body.password;
  if(email=='admin@admin' && password=='8Tribune'){
  	res.send({
      status: 'success',
    });
  }
  else{
  	res.send({
      status: 'fail',
      error: 'user not found'
    });
  }
})

app.post('/signup', function (req, res) {
  var email=req.body.email;
  var password=req.body.password;
  res.send({
    status: 'success',
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
var express = require('express');
var app = express();
app.listen(3000, () => {
   console.log('Server listening on 3000');
});

app.get('/', function(req, res) {
    //res.send('Hi Love');
    res.sendFile('index.html', { root: '.' });
  });

  app.get('/love', (req, res) => {
    res.send('Hi Love');
  });

  app.get('/signup.html', function(req, res) {
    //res.send('Hi Love');
    res.sendFile('html/signup.html', { root: '.' });
  });
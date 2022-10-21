var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(3000, () => {
   console.log('Server listening on 3000');
});

/*
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: '.' });
    //res.sendFile('style.css', { root: '.' });
  });
  */


  app.get('/love', (req, res) => {
    res.send('Hi Love');
  });
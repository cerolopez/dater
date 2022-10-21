var express = require('express');
var app = express();
app.listen(3000, () => {
   console.log('Server listening on 3000');
});

app.use(express.static("dater"));

/*
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: '.' });
    //res.sendFile('style.css', { root: '.' });
  });
  */

  app.get('/love', (req, res) => {
    res.send('Hi Love');
  });
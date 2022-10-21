var express = require('express');
var app = express();
app.listen(3000, () => {
   console.log('Server listening on 3000');
});

app.get('/', function(req, res) {
    res.send("Yep it's working");
  });

  app.get('/love', (req, res) => {
    res.send('Hi Love');
  });
  
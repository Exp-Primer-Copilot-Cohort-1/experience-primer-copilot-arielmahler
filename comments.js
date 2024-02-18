// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var commentsFilePath = path.join(__dirname, 'comments.json');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// Get comments
app.get('/comments', function(req, res) {
  fs.readFile(commentsFilePath, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Post comments
app.post('/comments', function(req, res) {
  fs.readFile(commentsFilePath, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      var comments = JSON.parse(data);
      var newComment = req.body;
      newComment.id = Date.now();
      comments.push(newComment);
      fs.writeFile(commentsFilePath, JSON.stringify(comments), function(err) {
        if (err) {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.json(newComment);
        }
      });
    }
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
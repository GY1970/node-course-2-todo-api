var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos });
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/12341234
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  // Valid id using isValid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send(); // 404 - send back empty send
  }

  // findById
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send(); // if no todo - send back 404 with empty body
    }
    // success
    res.send({ todo }); // if todo - send it back
  }).catch((e) => {
    res.send(400).send(); // 400 - and send empty body back
  });



  // error



});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = { app };
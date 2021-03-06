// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b921096eaf1ceb07a02e812')
  // }, {
  //     $set: {
  //       text: 'Love Laura'
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b921096eaf1ceb07a02e812')
  }, {
      $inc: {
        age: 2
      },
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

  // db.close();
});

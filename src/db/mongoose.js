const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {useNewUrlParser: true, useUnifiedTopology: true}).
catch(error => console.log(error));;

mongoose.connection.on('error', err => {
    console.log(err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

exports.mongoose = mongoose ;



   

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test', {})
  .then(() => console.log('Database in connected'))
  .catch(err => console.log('Database err', err))
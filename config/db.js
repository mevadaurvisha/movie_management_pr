const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/movie-Data')
    .then(() => {console.log('Data base connected')})
    .catch((err) => {
        console.log('connection err' ,err);
        
    })
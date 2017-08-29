const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/IntaApp');

//mongoose.connect('mongodb://lbrunori:lbrunori1342@ds151973.mlab.com:51973/intaapp')
module.export = { mongoose };

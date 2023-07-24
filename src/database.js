const mongoose = require('mongoose')

const {
    DB_USER, 
    DB_PASSWORD,
    DB_HOST, 
    IP_SERVER
} = require('./constants')

/* const {PSA_APP_HOST, PSA_APP_DATABASE} = process.env; */
const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`;

//mongoose.set('useFindAndModify', false);
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db => console.log('Database is connected'))
.catch(err => console.log(err));
    
const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const loginPage = require('./routes/login');
const home = require('./routes/home');

const app = express();

mongoose.connect('mongodb://localhost:27017/bidit', {useNewUrlParser: true, useUnifiedTopology: true});

//app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.use('/login', loginPage);
app.use('/', home);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
})

const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');


mongoose.connect('mongodb://localhost:27017/bidit', {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
})


app.listen(3000, () => {
  console.log('Listening on port 3000...');
})

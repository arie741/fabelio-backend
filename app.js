const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT;
var path = require('path');

const cron = require('./db/cron.js'); //cron functions
const nodecron = require('node-cron');//cron node library

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//routes
var indexRouter = require('./routes/index');
var linkListRouter = require('./routes/linklist');
var linkDetailRouter = require('./routes/linkdetail')

app.use('/', indexRouter);
app.use('/linklist', linkListRouter);
app.use('/linkdetails', linkDetailRouter);

//cron jobs that update the latest price every hour
var priceUpdateTask = nodecron.schedule('* * * * *', () => {
  cron();
  console.log("Initiating cron: update latest price");
});

priceUpdateTask.start();

app.listen(port, () => console.log(`Fabelio Backend listening on port ${port}!`))
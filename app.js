var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var metricsMiddleware = require('./middleware/metrics.middleware');
var { client } = require('./metrics');

var mongoose = require('mongoose');
//var MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:1234@127.0.0.1:27017/mydb';
//mongoose.connect('mongodb://admin:1234@172.24.98.167:27017/mydb')
//.then(() => console.log('connected'))
//.catch(err => console.error(err));

var allRouter = require('./routes/alluser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var metricRouter = require('./routes/moniter');
const User = require('./models/User');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// metrics middleware


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/myuser', allRouter);
app.use('/metrics', metricRouter);

app.use(metricsMiddleware);
// API
app.get('', (req, res) => {
  res.send('OK');
});

app.get('/data', (req, res) => {
  res.json([]);
});

app.get('/one=:id', (req, res) => {
  res.json({ id: req.params.id });
});

app.post('/add', (req, res) => {
  res.status(201).json({ created: true });
});

app.put('/name=:name', (req, res) => {
  res.json({ name: req.params.name });  
});

app.delete('/check/del=:name', async (req, res) => {
  try {
    const name = req.params.name;
    const users = await User.find();
    const finduser = users.find((u) => u.name === name );

    if (!finduser) {
      return res.json({ deleted: true})
    } else {
      await User.deleteOne({name: name});
    };
  }
  catch (err) {
    res.json(err);
  };
  //res.json({ deleted: true });
});




app.get('/check', (req, res) => {
    res.json({
      status: 'ok'
    }); 
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

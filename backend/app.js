require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors')
const hellosign = require('hellosign-sdk')({ key: process.env.HELLOSIGN_API_KEY })

var app = express();
app.use(cors({
    origin: "*"
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

const opts = {
  name: 'HelloSign Angular Demo',
  domain: 'abhattacharyea.dev',
  white_labeling_options: '{"primary_button_color":"#d64541","primary_button_text_color":"#000000"}'
};

var clientId = "<YOUR_CLIENT_ID>";

hellosign.apiApp.update(clientId, opts).then((res) => {
  console.log("API app updated successfully");
}).catch((err) => {
  console.error(err);
});

module.exports = app;

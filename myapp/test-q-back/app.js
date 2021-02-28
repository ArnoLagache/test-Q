const express = require('express');
const bodyParser = require('body-parser')
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//***** Set Access control Headers ****/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-requested-with, x-requested-by');
  next();
});

let Qlist = [];
fs.createReadStream("./public/csv/Liste_Q.csv")
  .pipe(csv(['url']))
  .on('data', (row) => {
    var data = {
      source: row.url,
      likes: Math.floor(Math.random() * 100),
      dislikes: Math.floor(Math.random() * 100),
      rank: 0,
      id: -1
    }        
    Qlist.push(data)
  })
  .on('end', () => {
    Qlist.sort(function(a, b) {
      return b.likes-a.likes;
    });

    for (i = 0; i < Qlist.length; i++){
      Qlist[i].id = i
      Qlist[i].rank = i + 1
    }
  });

// GET /qlist
// [ { source : "https://", dislikes:23, likes:43, rank:2, id:1 }]
app.get('/qlist', function (req, res) {
  return res.send(Qlist);
})

// GET /qlist/random
// { source : "https://", dislikes:23, likes:43, rank:2, id:1 }
app.get('/qlist/random', function (req, res) {
  let randomCardIndex = Math.floor(Math.random() * Qlist.length);
  return res.send(Qlist[randomCardIndex]);
})

// POST /qlist/like
// { source : "https://", dislikes:23, likes:43, rank:2, id:1 }
app.post('/qlist/like', function (req, res) {
  var cardLiked = req.body.id
  for (i = 0; i < Qlist.length; i++){
    if (cardLiked === Qlist[i].id){
      console.log(Qlist[i]);
      Qlist[i].likes += 1
      console.log(Qlist[i]);
      return res.send(Qlist[i]);
    }
  }
})

// POST /qlist/dislike
// { source : "https://", dislikes:23, likes:43, rank:2, id:1 }
app.post('/qlist/dislike', function (req, res) {
  var cardDisliked = req.body.id
  for (i = 0; i < Qlist.length; i++){
    if (cardDisliked === Qlist[i].id){
      console.log(Qlist[i]);
      Qlist[i].dislikes += 1;
      console.log(Qlist[i]);
      return res.send(Qlist[i]);
    }
  }
})

app.listen(3000)

/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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

module.exports = app;
*/
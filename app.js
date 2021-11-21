const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const route = require('./routes');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const productsRouter = require('./routes/products');
// const productDetailRouter = require('./routes/product-detail');

const app = express();

// view engine setup
app.engine('.hbs', exphbs({
  extname: '.hbs',
  helpers: {
    each_upto: (ary, max, options) => {
      var result = [];
      for (var i = 0; i < max; ++i)
        result.push(ary[i]);
      return result;
    }
  }
}),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
route(app);

// app.use('/', indexRouter);
// app.use('/products', productsRouter);
// app.use('/product-detail', productDetailRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import cons from 'consolidate';

import routes from './routes/routes';
import verifyBot from './controller/chatbot/verify';

const app = express();

// CORS
app.use(cors());

app.get('/api/webhook', verifyBot);

// Foward url to front-end
const staticFileMiddleware = express.static(path.join(__dirname, '../dist/'));
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
}));
app.use(staticFileMiddleware);

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// All front-end
app.use('/', express.static(path.join(__dirname, '../dist/')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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

export default app;

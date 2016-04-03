//MongoDB - Mongoose
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const User = require('../models/User');
const ShoppingList = require('../models/ShoppingList');
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');

//Other middlewares
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const logger = require('morgan');

//Satellizer
const moment = require('moment');
const jwt = require('jwt-simple');

//App and routers
const app = express();
const userAuthRouter = require('./user-router');
const userRouter = express.Router();
const shoppingRouter = express.Router();
const tripRouter = express.Router();
const vehicleRouter = express.Router();

//Setup for debug and public serving
app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }) );

//Setup for restify
app.use(methodOverride());

//So far, allow all domain access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

//Setup router for express-restify-mongoose
restify.serve(userRouter, User, {name: 'users'});
restify.serve(shoppingRouter, ShoppingList, {name: 'shopping_list'});
restify.serve(tripRouter, Trip, {name: 'trips'});
restify.serve(vehicleRouter, Vehicle, {name: 'vehicle'});

//Setup routers. Will add auth once all routes run well
app.use(userRouter);
app.use('/auth', userAuthRouter);
app.use(shoppingRouter);
app.use(tripRouter);
app.use(vehicleRouter);
app.use(function(req, res, next) {
  res.status(404).send('404, no page found: ' + req.url);
});
module.exports = app;

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
  if ( req.method === 'OPTIONS' ) return next(); //Pass this to router. Our router doesn't have any method hat deals with OPTIONS request

  if (!req.header('Authorization')) {
    console.log(req.headers);
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

var express = require('express');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

  app = express(),
  port = process.env.PORT || 8080;

mongoose = require('mongoose'),
Task = require('./api/models/userModel'), //created model loading here
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@cluster0-ie3nu.mongodb.net/test'); 

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });



  module.exports = app.listen(port);

console.log('User-Service RESTful API server started on: ' + port);
/*
  @Gowtham Bharadwaj
  801101552
*/

var express = require('express');
var path = require('path');
var catalogController = require('./controller/catalogController');
var profileController = require('./controller/profileController');
var app = express();

//sessions
var session = require('express-session');
var cookieParser = require('cookie-parser');

//Used to setup the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use (express.static(path.join(__dirname, 'public')));

//User session
app.use(cookieParser());
app.use(session({secret: "wanderlust",resave: false,saveUninitialized: false}));

//Used to route to different webpages
app.use('/',catalogController);
// app.use('/home',catalogController);
// app.use('/categories',catalogController);
// app.use('/categories/:categoryName',catalogController);
// app.use('/categories/item/:itemcode',catalogController);
// app.use('/categories/item/saveit/:itemcode',catalogController);
// app.use('/feedback/update/:itemCode',catalogController);
// app.use('/about',catalogController);
// app.use('/contact',catalogController);

// app.use('/',profileController);
app.use('/myItems',profileController);

app.listen(3000);
console.log("Application has started running and now connected to port 3000");

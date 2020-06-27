/*
  @Gowtham Bharadwaj
  801101552
*/

var express = require('express');
var path = require('path');
var catalogController = require('./controller/catalogController');
var app = express();

//Used to setup the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use (express.static(path.join(__dirname, 'public')));

//Used to route to different webpages
app.use('/', catalogController);
app.use('/myItems', catalogController);
app.use('/categories',catalogController);
app.use('/categories/:categoryName',catalogController);
app.use('/categories/item/:itemCode',catalogController);
app.use('/contact', catalogController);
app.use('/about', catalogController);
app.use('/item', catalogController);
app.use('/home', catalogController);
app.use('/feedback', catalogController);

app.listen(3000);

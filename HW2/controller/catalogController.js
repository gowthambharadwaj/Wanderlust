/*
  @Gowtham Bharadwaj
  801101552
*/
 var express = require('express');
 var router = express.Router();
 var itemDb = require('../utility/ItemDB');

 router.get('/', function(req, res){
      var page= {
       title:'Index',
       path: req.url
     }
     res.render('index', { title: page});
 });

 router.get('/index', function(req, res){
   var page= {
    title:'Index',
    path: req.url
  }
  res.render('index', { title: page});
 });

 router.get('/categories', function(req, res){
   var categories = getCategories();
   var itemData = itemDb.getItems();
   var data= {
       title:'Categories',
       path: req.url,
       categories: categories,
       items: itemData
   }
     res.render('categories', { data: data });
 });

 router.get('/categories/:categoryName', function (req,res) {
     var categories = [];
     categories.push(req.params.categoryName);
     var itemData = itemDb.getItems();
     var data= {
         title:'Categories',
         path: req.url,
         categories: categories,
         items: itemData
     }
     res.render('categories', { data: data});
 });


 router.get('/categories/item/:itemCode', function(req, res, next) {
    var itemCode = req.params.itemCode;
    console.log("Item Code:"+itemCode);
    var item = itemDb.getItem(itemCode);

    if((itemCode>6)|(itemCode<1)){
      var categories = getCategories();
      var itemData = itemDb.getItems();

      var data= {
          title:'Categories',
          path: req.url,
          categories: categories,
          items: itemData
      }
      res.render('categories', { data: data});
    }

    console.log(item);
    var data= {
        title:'Item',
        path: req.url,
        item: item
    }
    res.render('item', { data: item});
});

 router.get('/myItems', function(req, res){
   var page= {
    title:'My Items',
    path: req.url
}
     res.render('myItems',{title: page});
 });

 router.get('/feedback', function(req, res){
      var page= {
       title:'Feedback',
       path: req.url
     }
     res.render('feedback', { title: page});
 });

 router.get('/about', function(req, res){
      var page= {
       title:'About',
       path: req.url
     }
     res.render('about', { title: page});
 });


 router.get('/contact', function(req, res){
      var page= {
       title:'Contact',
       path: req.url
     }
     res.render('contact', { title: page});
 });

 var categories = [];

let getCategories = function() {
    // get the category of each item
    var data = itemDb.getItems();
    data.forEach(function (item) {
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
    });
    return categories;
};

 module.exports = router;

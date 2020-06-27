/*
  @Gowtham Bharadwaj
  801101552
*/
var express = require('express');
var router = express.Router();
var itemDb = require('../utility/itemDB');
var UserDB = require('../utility/UserDB');
var UserItem = require('../model/useritem');
var UserProfile = require('../model/userprofile');
var User = require('../model/user');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/',function(req,res){
  var user = req.session.theUser;
  console.log("Data: "+JSON.stringify(req.session.theUser));
  res.render('index',{data: user});
});

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/');
});

router.get('/index',function(req,res){
  res.render('index');
});

router.get('/categories', function(req, res) {

    var categories = getCategories();
    var itemData = itemDb.getItems();
    var data= {
        title:'Categories',
        path: req.url,
        categories: categories,
        items: itemData
    }

    res.render('categories', { data: data});
});

router.get('/categories/:categoryName', function (req,res) {
    // get the category name
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

router.get('/about',function(req,res){
  var user = req.session.theUser;
  console.log("Data: "+JSON.stringify(req.session.theUser));
  res.render('about',{data: user});
});
router.get('/contact',function(req,res){
  var user = req.session.theUser;
  console.log("Data: "+JSON.stringify(req.session.theUser));
  res.render('contact',{data: user});
});

router.get('/feedback/:itemCode',function(req,res){

  var itemCode = req.params.itemCode;
  console.log("Item Code:"+itemCode);

  var item = itemDb.getItem(itemCode);
  var data = {
    item: item
  };


  res.render('feedback',{data:data});
});

router.get('/categories/item/:itemCode', function(req, res, next) {
    var itemCode = req.params.itemCode;
    console.log("Item Code:"+itemCode);

    if(itemCode>6 || itemCode<1){
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

    else{
      var item = itemDb.getItem(itemCode);
      //console.log("Item got from getitem :"+item);
      var data= {
          title:'Item',
          path: req.url,
          item: item
      }
      res.render('item', { data: data});
    }

});

var categories = [];

let getCategories = function() {
    // get the category of each item
    var data = itemDb.getItems();

    data.forEach(function (item) {
      console.log("catalogCategory: "+item.catalogCategory);
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
    });
    return categories;
};

router.get('/categories/item/saveit/:itemCode',function(req,res){
  var flag = -1;
  if(req.session.theUser){
    flag = getItem(req.session.userProfile._userList,req.params.itemCode);
    if(flag == -2){
      let itemDetails = itemDb.getItem(req.params.itemCode);
      var userItem = new UserItem(itemDetails.itemCode,itemDetails.itemName,itemDetails.rating,false,itemDetails.catalogCategory);
      req.session.userProfile._userList.push(userItem);
      console.log("Saved data: "+req.session.userProfile._userList);
      res.redirect('/myItems');
    }
    else {
      console.log("Item already present");
      res.redirect('/myItems');
    }
  }
  else {
    console.log("Inside else part of get");
    var userId = 11;
    var userObj= UserDB.getUser(parseInt(userId));
    req.session.theUser = userObj;
    req.session.userProfile = UserDB.getUserProfile(userId);
    let itemcode = req.params.itemCode;
    let itemDetails = itemDb.getItem(itemcode);
    var userItem = new UserItem(itemDetails.itemCode,itemDetails.itemName,itemDetails.rating,false,itemDetails.catalogCategory);
    req.session.userProfile._userList.push(userItem);

    res.redirect('/myItems');
  }
});

router.post('/feedback/update/:itemCode',function(req,res){
  let itemcode = -1;
  var flag = -1;
  console.log("ItemRating: "+req.body.feedbackHidden);
  if(req.body.itemCode == req.body.itemList){
    itemcode = req.body.itemCode;

    console.log("Inside update: "+JSON.stringify(req.session.theUser));
  if(req.session.theUser){
    flag = getItem(req.session.userProfile._userList,itemcode);
    if (flag == -2) {
                console.log('Item not present in the users profile');
                res.redirect('/myItems');
            }
    else{
      if(req.body.feedbackHidden == 'rating'){
        req.session.userProfile._userList[flag]._rating = parseInt(req.body.rating,10);
        res.redirect('/myItems');
      }
      else if (req.body.feedbackHidden == 'madeIt') {
          console.log(req.body.madeItRadio);
          if(req.body.madeItRadio!=undefined){
                req.session.userProfile._userList[flag]._madeIt = JSON.parse(req.body.madeItRadio);
                res.redirect('/myItems');
    }
    else{
      res.redirect('/categories/item/' + req.params.itemCode + '/feedback');
    }
  }
}

}
}
});

router.get('/myItems/delete/:itemCode', function (req, res) {
    var flag = -1;
    if (req.session.theUser) {
        flag = getItem(req.session.userProfile._userList, req.params.itemCode);
        if (flag == -2) {
            console.log('Item not present in the users profile');
            res.redirect('/myItems');
        } else {
            req.session.userProfile._userList.splice(flag, 1);
            res.redirect('/myItems');
        }
    } else {
        res.redirect('/');
    }
});


var getItem = function(itemList,itemCode){
  for(var i=0;i<itemList.length;i++){
    if(itemList[i]._itemCode == parseInt(itemCode,10)){
      return i;
    }
  }
  return -2;
};

module.exports.getItem = getItem;
module.exports = router;

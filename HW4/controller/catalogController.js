/*
  @Gowtham Bharadwaj
  801101552
*/

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var UserItem = require('../model/useritem');
var UserProfile = require('../model/userprofile');
var User = require('../model/user');
var ItemData = require('../model/item');
//var itemDb = require('../utility/itemDB');
//var UserDB = require('../utility/UserDB');

var ProfileController = require('../controller/profileController');


router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: false
}));

//Route to homepage of the website
router.get('/',function(req,res){
  console.log("Index page");
  if(req.session.theUser){
    var user = req.session.theUser;
    res.render('index',{isloggedin:true,user:user});
  }
  else{
    res.render('index',{isloggedin:false});
  }
});

router.get('/signin',function(req,res){
  console.log("User logged in");
  req.session.isloggedin = true;
  res.redirect('/myItems');
});

//Route to logout - Part os session
router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/');
});

//Route to categories of the information available on our website
router.get('/categories', function(req, res) {
  console.log("Categories page");
  var data = {};
  if(req.session.theUser){
    var user = req.session.theUser;
    var category = ItemData.ItemModel.distinct('catalogCategory');
    category.then(function(doc){
      data.categories = doc;
      getAllItems.then(function(docs){
          data.items = docs;
          //console.log("Data from getall function: "+data.items);
          res.render('categories',{data:data,isloggedin:true,user:user});
        });
    });
  }
  else{
    var category = ItemData.ItemModel.distinct('catalogCategory');
    category.then(function(doc){
      data.categories = doc;
      getAllItems.then(function(docs){
          data.items = docs;
          //console.log("Data from getall function: "+data.items);
          res.render('categories',{data:data,isloggedin:false});
        });
    })
  }
});

//Route to respective  of the information available on our website
router.get('/categories/item/:itemCode', function(req, res, next) {
    var itemCode = req.params.itemCode;
    var data = {};
    if(req.session.theUser){
      var user = req.session.theUser;
      getItem(itemCode).then(function(doc){
        if(itemCode>6||itemCode<1){
          res.redirect('/categories');
        }
        else{
          data.item = doc;
          res.render('item',{data:data,isloggedin:true,user:user});
        }
      });
    }
    else{
      getItem(itemCode).then(function(doc){
        if(itemCode>6||itemCode<1){
          res.redirect('/categories');
        }
        else{
          data.item = doc;
          res.render('item',{data:data,isloggedin:false});
        }
      })
    }
});

//Route to information about the website
router.get('/about',function(req,res){
  console.log("About page");
  if(req.session.theUser){
    var user = req.session.theUser;
    res.render('about',{isloggedin:true,user:user});
  }
  else {
    res.render('about',{isloggedin:false});
  }
});

//Route to contact information about the website
router.get('/contact',function(req,res){
  console.log("Contact page");
  if(req.session.theUser){
    var user = req.session.theUser;
  res.render('contact',{isloggedin:true,user:user});
}
else {
  res.render('contact',{isloggedin:false});
}
});

//Route to provide feedback about the places
router.get('/feedback/:itemCode',function(req,res){
  console.log("Feedback page");
  var itemCode = req.params.itemCode;
  var data = {};
  //console.log("Item Code:"+itemCode);
  if(req.session.theUser){
    var user = req.session.theUser;
    getItem(itemCode).then(function(doc){
      if(itemCode>100||itemCode<1){
        res.redirect('/categories');
      }
      else{
        data.item = doc;
        res.render('feedback',{data:data,isloggedin:true,user:user});
      }
    });
  }
  else{
    getItem(itemCode).then(function(doc){
      if(itemCode>6||itemCode<1){
        res.redirect('/categories');
      }
      else{
        data.item = doc;
        res.render('feedback',{data:data,isloggedin:false});
      }
    });
  }
});

//Routing to save items in user's profile
router.get('/categories/item/saveit/:itemCode',function(req,res){
  let itemCode = req.params.itemCode;
  var tempsession = req.session.theUser;
  console.log("Save the item");
  //console.log("item Code in save it: "+itemCode);
  if(req.session.theUser){
    //console.log("User Id inside: "+tempsession[0].userId);
    var id = tempsession[0].userId;
    User.UserModel.findOne({userId:id,"user_item.itemCode":itemCode},{"user_item.$":1})
      .then(function(doc){
        if(doc==null){
          console.log("Item is not present");
          getItem(itemCode).then(function(docs){
            for(var i=0;i<docs.length;i++){
              var itemName = docs[i].itemName;
              var rating = docs[i].rating;
              var catalogCategory = docs[i].catalogCategory;
              var madeIt = false;
            }
            User.UserModel.findOneAndUpdate({userId:id},
              {$push:{user_item: {
            itemName:itemName,
            itemCode:itemCode,
            rating:rating,
            catalogCategory: catalogCategory,
            madeIt: madeIt
          }}},{new:true})
          .then(function(doc){
            var change = [];
            change.push(doc);
            req.session.theUser = change;
            res.redirect('/myItems');
          });
        });
      }
        else {
          console.log("User has already saved this item");
          res.redirect('/myItems');
        }
    });

  }
  else{
    var userId = 1; //when session is not started we are logging in the first user
    var userDetails = ProfileController.getUser(userId);
    userDetails.then(function(doc){
      User.UserModel.findOne({userId:userId,"user_item.itemCode":itemCode},{"user_item.$":1})
        .then(function(doc){
          if(doc==null){
            console.log("Item is not present");
            getItem(itemCode).then(function(docs){
              console.log("Item to update: "+docs[0].itemName);
              for(var i=0;i<docs.length;i++){
                var itemName = docs[i].itemName;
                var rating = docs[i].rating;
                var catalogCategory = docs[i].catalogCategory;
                var madeIt = false;
              }
              User.UserModel.findOneAndUpdate({userId:userId},
                {$push:{user_item: {
              itemName:itemName,
              itemCode:itemCode,
              rating:rating,
              catalogCategory: catalogCategory,
              madeIt: madeIt
            }}},{new:true})
            .then(function(doc){
              var change = [];
              change.push(doc);
              req.session.theUser = change;
              res.redirect('/myItems');
            });
          });
        }
          else {
            console.log("User has already saved this item");
            res.redirect('/myItems');
          }
      });
    });
  }
});

//Routing to update feedback of items
router.post('/feedback/update/:itemCode',function(req,res){
  console.log("Update the item");
  console.log("Item Rating: "+req.body.rating);
  var rating = req.body.rating;
  var itemCode = req.body.itemCode;
  var tempsession = req.session.theUser;
  var madeIt = req.body.madeItRadio;

  //console.log("User id inside feedback/update: "+tempsession[0].userId);
  if(req.session.theUser){
    var userId = tempsession[0].userId;
    User.UserModel.findOne({userId: userId,'user_item.itemCode':itemCode})
        .then(function(doc){
            if(doc!=null){
                if(req.body.feedbackHidden == 'rating'){
                    addItemRating(itemCode,userId,rating).then(function(doc){
                        ItemData.ItemModel.findOneAndUpdate({itemCode:itemCode},{$set:{rating:rating}},{new:true}).then(function(doc){
                              console.log("Data inside udpate: "+doc);
                            });
                            var change = [];
                            change.push(doc);
                            req.session.theUser = change;
                            res.redirect('/myItems');
                            //console.log("Redirecting to My Experience");
                          });
                        }
                        else if(req.body.feedbackHidden == 'madeIt'){
                          addMadeIt(itemCode,userId,madeIt).then(function(doc){
                            var change = [];
                            change.push(doc);
                            req.session.theUser = change;
                            res.redirect('/myItems');
                            //console.log("Redirecting to My Experience");
                          });
                        }
                      }
              else{
                console.log("Rating not allowed: User does not has this item");
                res.redirect('/myItems');
              }
            });
  }
  else{
    var userId = 1;
    User.UserModel.findOne({userId: userId,'user_item.itemCode':itemCode})
        .then(function(doc){
            if(doc!=null){
                if(req.body.feedbackHidden == 'rating'){
                    addItemRating(itemCode,userId,rating).then(function(doc){
                      ItemData.ItemModel.findOneAndUpdate({itemCode:itemCode},{$set:{rating:rating}},{new:true}).then(function(doc){
                            console.log("Data to udpate: "+doc);
                          });
                            var change = [];
                            change.push(doc);
                            req.session.theUser = change;
                            res.redirect('/myItems');
                          });
                        }
                        else if(req.body.feedbackHidden == 'madeIt'){
                          addMadeIt(itemCode,userId,madeIt).then(function(doc){
                            var change = [];
                            change.push(doc);
                            req.session.theUser = change;
                            res.redirect('/myItems');
                          });
                        }
                  }
              else{
                console.log("Rating not allowed: User does not has this item");
                res.redirect('/myItems');
              }
        });
  }
});

//Routing to delete items
router.get('/myItems/delete/:itemCode', function (req, res) {
  console.log("Delete the item");
  let itemCode = req.params.itemCode;
  var tempsession = req.session.theUser;
  console.log("Item to delete "+itemCode);
  var id = tempsession[0].userId;
  User.UserModel.findOneAndUpdate({userId: id},
  {$pull:{user_item: {itemCode: itemCode}}},{new:true})
  .then(function(doc){
    var change = [];
    change.push(doc);
    req.session.theUser = change;
    console.log("Item deleted "+doc);
    res.redirect('/myItems');
    console.log("Redirecting to My Experiences");
  });
});

//console.log("Display categories");
//Function to display categories
var getAllItems = new Promise(function(resolve,reject){
  var items = [];
  ItemData.ItemModel.find()
    .then(function(doc){
      for(var i=0;i<doc.length;i++){
        var item = new ItemData.Item(doc[i].itemCode,
                doc[i].itemName,
                doc[i].catalogCategory,
                doc[i].description,
                doc[i].rating,
                doc[i].getimageURL);

          items.push(item);
      }
      resolve(doc);
      return items;
    }).catch(function(err){
      reject(err);
    });
});

//console.log("Display Items");
//Function to display Items
var getItem = function(itemCode){
  return new Promise(function(resolve,reject){
    var items = [];
    ItemData.ItemModel.find({itemCode:itemCode})
      .then(function(doc){
        for(var i=0;i<doc.length;i++){
          var item = new ItemData.Item(doc[i].itemCode,
                  doc[i].itemName,
                  doc[i].catalogCategory,
                  doc[i].description,
                  doc[i].rating,
                  doc[i].getimageURL);
            items.push(item);
        }
        resolve(doc);
        return items;
      }).catch(function(err){
        reject(err);
      })
  });
};

var addItemRating = function(itemCode,userId,rating){
  return new Promise(function(resolve,reject){
    var change = [];
      User.UserModel.findOneAndUpdate({userId:userId,'user_item.itemCode':itemCode},
        {$set:{'user_item.$.rating':rating}},{new:true}).then(function(doc){
          change.push(doc);
          resolve(doc);
          return change;
        }).catch(function(err){
          reject(err);
          console.log("Error: "+err);
        });
  })
}

var addMadeIt = function(itemCode,userId,madeIt){
  return new Promise(function(resolve,reject){
    var change = [];
    User.UserModel.findOneAndUpdate({userId:userId,'user_item.itemCode':itemCode},
      {$set:{'user_item.$.madeIt':madeIt}},{new:true}).then(function(doc){
        change.push(doc);
        resolve(doc);
        return change;
      }).catch(function(err){
        reject(err);
        console.log("Error: "+err);
      });
  })
}

module.exports.getItem = getItem;
module.exports = router;

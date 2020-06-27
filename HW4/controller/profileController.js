/*
  @Gowtham Bharadwaj
  801101552
*/

var express = require('express');
var router = express.Router();

var User = require('../model/user');
var UserItem = require('../model/useritem');
var UserProfile = require('../model/userprofile');
// var UserDB = require('../utility/UserDB');

var user = null;
var userProfile = null;

router.use(function getSession(req,res,next){
  if(req.session.theUser){
    var tempsession = req.session.theUser;
    user = new User.User(tempsession[0].userId,tempsession[0].firstName,tempsession[0].lastName,tempsession[0].emailid,tempsession[0].address1,tempsession[0].address2,tempsession[0].city,tempsession[0].state,tempsession[0].zipCode,tempsession[0].country);

    userProfile = new UserProfile(tempsession[0].userId);

    for (var j = 0; j < tempsession[0].user_item.length; j++) {
      var userItem = new UserItem(tempsession[0].user_item[j].itemCode,
          tempsession[0].user_item[j].itemName,
          tempsession[0].user_item[j].rating,
          tempsession[0].user_item[j].madeIt,
          tempsession[0].user_item[j].catalogCategory);

      userProfile.addItem(userItem);
  }
}
  else{
    user = null;
    userProfile = null;
  }

next();

});

router.get('/',function(req,res,next){
  if(req.session.theUser){
    //console.log("Comes here if redirected");
    var user = req.session.theUser
    var data = {
            title: 'myItems',
            path: req.url,
            userProfile: userProfile
        };
    res.render('myItems',{data: data,isloggedin:true,user:user});
  }
  else{
    var userId = 1;
    var userObj= getUser(userId);
    getUser(userId).then(function(doc){
      req.session.theUser = doc;
      res.redirect('/myItems');
    });

  }
});

var getAllUsers = new Promise(function(resolve,reject){
  let userData = [];
  User.UserModel.find()
    .then(function(doc){
        for(var i=0;i<doc.length;i++){
          var user = new User.User(doc[i].userId,
                doc[i].firstName,
                doc[i].lastName,
                doc[i].emailid,
                doc[i].address1,
                doc[i].address2,
                doc[i].city,
                doc[i].state,
                doc[i].zipCode,
                doc[i].country);
          var userItem = new UserItem(doc[i].user_item.itemCode,
                  doc[i].user_item.itemName,
                  doc[i].user_item.rating,
                  doc[i].user_item.madeIt,
                  doc[i].user_item.catalogCategory);

          var userProfile = new UserProfile(doc[i].userId);

          userData.push(user);
          userData.push(userItem);
          userProfile.addItem(userItem);
        }
        resolve(doc);
        return userData;
      }).catch(function(err){
        console.log("Error: "+err);
        reject(err);
      });

});

var getUser = function(userId){
  return new Promise(function(resolve,reject){
    var userItems = [];
    //console.log("Inside getUser: "+userId);
    User.UserModel.find({userId:userId})
      .then(function(doc){
        //console.log("Inside .then"+doc);
        for(var i=0;i<doc.length;i++){
          var userProfile = new UserProfile(doc[i].userId);
          var user = new User.User(doc[i].userId,
              doc[i].firstName,
              doc[i].lastName,
              doc[i].emailid,
              doc[i].address1,
              doc[i].address2,
              doc[i].city,
              doc[i].state,
              doc[i].zipCode,
              doc[i].country);
        //console.log("user item length: "+doc[i].user_item.length);
        userItems.push(user);
        for(var j=0;j<doc[i].user_item.length;j++){
          var userItem = new UserItem(doc[i].user_item[j].itemCode,
                     doc[i].user_item[j].itemName,
                     doc[i].user_item[j].rating,
                     doc[i].user_item[j].madeIt,
                     doc[i].user_item[j].catalogCategory);
          userItems.push(userItem);
          userProfile.addItem(userItem);
        }
        }
        resolve(doc);
        return userItems;
      }).catch(function(err){
        console.log("Error: "+err);
        reject(doc);
      });

  });
}

module.exports = router;
module.exports.getUser = getUser;

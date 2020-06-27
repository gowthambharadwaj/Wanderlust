/*
  @Gowtham Bharadwaj
  801101552
*/

var express = require('express');
var router = express.Router();
var User = require('../model/user');
var UserDB = require('../utility/UserDB');
var UserItem = require('../model/useritem');
var UserProfile = require('../model/userprofile');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var user = null;
var userProfile = null;

router.use(function getSession(req,res,next){
  //console.log("I am executed here");
  if(req.session.theUser){
    var temp = req.session.theUser;
    user = new User(temp._userId,temp._firstName,temp._lastName,temp._email,temp._addr1,temp._addr2,temp._city,temp._state,temp._zipCode,temp._country);

    var userProfileTemp = req.session.userProfile;
    //console.log("User Profile: "+JSON.stringify(userProfileTemp));
    userProfile = new UserProfile(userProfileTemp._userId);
    //console.log("User profile in middleware: "+JSON.stringify(userProfileTemp));
    for (var j = 0; j < userProfileTemp._userList.length; j++) {
      var userItem = new UserItem(userProfileTemp._userList[j]._itemCode,
          userProfileTemp._userList[j]._itemName,
          userProfileTemp._userList[j]._rating,
          userProfileTemp._userList[j]._madeIt,
          userProfileTemp._userList[j]._catalogCategory);

      userProfile.addItem(userItem);
  }
}//end of if
  else{
    user = null;
    userProfile = null;
  }
    // console.log("User Item in middleware: "+JSON.stringify(user_item));
    // var userProfile = new UserProfile(userProfileTemp._userId,user_item);
    // console.log("Inside middleware getSession: "+JSON.stringify(userProfile));
    next();

});

router.get('/',function(req,res,next){
  if(req.session.theUser){
    //console.log("User profile inside If: "+JSON.stringify(userProfile));
    var data = {
            title: 'myItems',
            path: req.url,
            userProfile: userProfile
        };
    res.render('myItems',{data: data});
    //next();
  }
  else{
    console.log("Inside else part of get");
    var userId = 11;
    var userObj= UserDB.getUser(parseInt(userId));
    //var useritems = UserDB.getUsersList(userObj.userId);
    req.session.theUser = userObj;
    //console.log("first encounter redirect: "+JSON.stringify(req.session.theUser));
    req.session.userProfile = UserDB.getUserProfile(userId);
    //console.log("User profile inside else of redirect: "+JSON.stringify(req.session.userProfile));
    res.redirect('/myItems');
  }
});

module.exports = router;

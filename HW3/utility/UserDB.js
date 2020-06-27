/*
  @Gowtham Bharadwaj
  801101552
*/

var User = require('../model/user');
var UserProfile = require('../model/userprofile');
var UserItem = require('../model/useritem');
//var Item = require('../utility/itemDB');

module.exports.getUsers = function(){
  let userdt = [];
  for(let i=0;i<userdata.length;i++){
    let user = new User(userdata[i].userId,
          userdata[i].firstName,
          userdata[i].lastName,
          userdata[i].email,
          userdata[i].addr1,
          userdata[i].addr2,
          userdata[i].city,
          userdata[i].state,
          userdata[i].zipCode,
          userdata[i].country);

      //console.log("User data"+JSON.stringify(user));

      userdt.push(user);

  }
  return userdt;
}

module.exports.getUser = function(id){
  let userdt = [];
  // console.log("inside getUsers");
  // console.log("ID: "+id);
  // console.log("User data id: "+parseInt(userdata[0].userId));
  for(let i=0;i<userdata.length;i++){
    //console.log("Inside for");
    if(parseInt(userdata[i].userId)==id){//inside if
    let user = new User(userdata[i].userId,
          userdata[i].firstName,
          userdata[i].lastName,
          userdata[i].email,
          userdata[i].addr1,
          userdata[i].addr2,
          userdata[i].city,
          userdata[i].state,
          userdata[i].zipCode,
          userdata[i].country);

      //console.log("User data"+JSON.stringify(user));

      userdt.push(user);
    }
    else{
      console.log("Inside else of getUsers");
    }

  }
  return userdt;
}

module.exports.getUserProfiles = function() {
    var userProfiles = [];
    for (var i = 0; i < user_profile.length; i++) {
        var userProfile = new UserProfile(user_profile[i].userId);

        for(var j=0; j < user_profile[i].userItemList.length; j++){
            var userItem = new UserItem(user_profile[i].userItemList[j].itemCode,
                user_profile[i].userItemList[j].itemName,
                user_profile[i].userItemList[j].catalogCategory,
                user_profile[i].userItemList[j].rating,
                user_profile[i].userItemList[j].madeIt);

            userProfile.addItem(userItem);
        }

        userProfiles.push(userProfile);
    }
    return userProfiles;
};
module.exports.getUserProfile = function (userId) {
  // console.log("User profile length"+user_profile.length);
  // console.log("User ID in profile: "+parseInt(user_profile[0].userId));
  // console.log("User ID sent: "+userId);


    for (var i = 0; i < user_profile.length; i++) {
        if (parseInt(user_profile[i].userId) == userId) {
            var userProfile = new UserProfile(user_profile[i].userId);

            for(var j=0; j < user_profile[i].user_item.length; j++){
                var userItem = new UserItem(user_profile[i].user_item[j].itemCode,
                    user_profile[i].user_item[j].itemName,
                    user_profile[i].user_item[j].rating,
                    user_profile[i].user_item[j].madeIt,
                    user_profile[i].user_item[j].catalogCategory);

                //console.log("User Item data inside user profile: "+JSON.stringify(userItem));

                userProfile.addItem(userItem);

            }

            return userProfile;
        }

    }
};


var userdata = [
  {
    userId: 11,
    firstName: "Gowtham",
    lastName: "Bharadwaj",
    email: "gbharadw@uncc.edu",
    addr1: "9543 University Terrace Drive",
    addr2: "Apartment C",
    city: "Charlotte",
    state: "NC",
    zipCode: 28262,
    country: "USA"

  },
  {
    userId: 12,
    firstName: "Deepak",
    lastName: "Bagrecha",
    email: "dbagrecha@alberta.edu",
    addr1: "University Housing",
    addr2: "Apt D",
    city: "Alberta",
    state: "Alberta",
    zipCode: 28262,
    country: "Canada"

  }

];

var user_profile = [
  {
    userId: 11,
    user_item: [
      {
        itemName:"Rock Beach",
        itemCode:1,
        rating:5,
        catalogCategory: "Sightseeing",
        madeIt: true
      },
      {
        itemName:"kumaraparvatha",
        itemCode:4,
        rating:4,
        catalogCategory: "Adventure",
        madeIt: false
      }
    ]
  }
];

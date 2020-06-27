/*
  @Gowtham Bharadwaj
  801101552
*/

var UserDB = require('../utility/UserDB');
var UserItem = require('../model/useritem');



class UserProfile{

	/* User ID
List containing UserItem objects
addItem -  adds a UserItem to the user profile. This function should support adding a UserItem by a function call that provides values to create the UserItem object (item, rating and  made it) or a function call that provides the UserItem object. The profile should not allow multiple UserItem for the same item, but should update appropriately if one already exists.
removeItem(Item) – removes any UserItem associated with the given Item.
updateItem(UserItem) - updates a UserItem data (rating, made it)
getItems() – returns a List / Collection of UserItem from the user profile
emptyProfile() –clears the entire profile contents */



	constructor(userId){
		this._userId = userId;
		this._userList = [];
		//ulist = userList;
	}

	get userId(){
		return this._userId;
	}
	set userId(value){
		this._userId = value;
	}

	get userlist(){
		return this._userList;
	}
	set userlist(value){
		this._userList = value;
	}


	    addItem(userItem) {
	        if (userItem instanceof UserItem) {
	            this._userList.push(userItem);
	        } else {
	            console.log('Invalid Object --> It should be of type UserItem')
	        }
	    }

	    removeItem(userItem) {
	        if (userItem instanceof UserItem) {
	            this._userList.filter(function (item) {
	                return item != userItem;
	            });
	        } else {
	            console.log('Invalid Object --> It should be of type UserItem')
	        }
	    }

	    updateItem(userItem) {
	        if (userItem instanceof UserItem) {
	            const index = this._userList.findIndex((e) => e.item.itemCode === userItem.item.itemCode);
	            if (index === -1) {
	                console.log('User Item not present in the list');
	            } else {
	                this._userList[index] = userItem;
	            }
	        } else {
	            console.log('Invalid Object --> It should be of type UserItem')
	        }
	    }

	    getItems() {
	        return this._userList;
	    }

	    emptyProfile() {
	        this.userList = [];
	    }

}

module.exports = UserProfile;

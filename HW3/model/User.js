/*
  @Gowtham Bharadwaj
  801101552
*/

class User{

  /**
   * Constructor
   * @param userId
   * @param firstName
   * @param lastName
   * @param email
   * @param addr1
   * @param addr2
   * @param city
   * @param state
   * @param zipCode
   * @param country
   */

   constructor(userId,firstName,lastName,email,addr1,addr2,city,state,zipCode,country){
     this._userId = userId;
     this._firstName = firstName;
     this._lastName = lastName;
     this._email =  email;
     this._addr1 = addr1;
     this._addr2 = addr2;
     this._city = city;
     this._state = state;
     this._zipCode = zipCode;
     this._country = country;
   }

   // sendUser(userId){
   //   return new User(userId,null,null,null,null,null,null,null,null,null);
   // }
   // constructor(userId){
   //   this._userId = userId;
   // }

   /*
   * Getters and Setters
   */

   get userId() {
       return this._userId;
   }

   set userId(value) {
       this._userId = value;
   }

   get firstName() {
       return this._firstName;
   }

   set firstName(value) {
       this._firstName = value;
   }

   get lastName() {
       return this._lastName;
   }

   set lastName(value) {
       this._lastName = value;
   }

   get email() {
       return this._email;
   }

   set email(value) {
       this._email = value;
   }

   get addr1() {
       return this._addr1;
   }

   set addr1(value) {
       this._addr1 = value;
   }

   get addr2() {
       return this._addr2;
   }

   set addr2(value) {
       this._addr2 = value;
   }

   get city() {
       return this._city;
   }

   set city(value) {
       this._city = value;
   }

   get state() {
       return this._state;
   }

   set state(value) {
       this._state = value;
   }

   get zipCode() {
       return this._zipCode;
   }

   set zipCode(value) {
       this._zipCode = value;
   }

   get country() {
       return this._country;
   }

   set country(value) {
       this._country = value;
   }


}
//
// // module.exports.UserItem = function(item,rating,madeIt){
// //   item: item,
// //   rating: rating,
// //   madeIt: madeIt
// // }
//
//
//
// //
// //  User user = new User();
// //var UserItem = require('./UserItem');
//
//
//
//
// // module.exports = UserProfile;
module.exports = User;

/*
  @Gowtham Bharadwaj
  801101552
*/

//Initial connection setup to the MongoDB database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wanderlust',{useNewUrlParser: true});
mongoose.set('useFindAndModify',false);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
 console.log("Connection to MongoDB database successfully established");
});

// Schema used for the items in the database
var itemSchema = new mongoose.Schema({
   itemCode: {type: Number,required: true},
   itemName: {type: String,required: true},
   catalogCategory: {type: String,required: true},
   description: {type: String,required: true},
   rating: {type: Number,required: true},
   getimageURL: {type: String,required: true}
},{collection:'ItemData'});

class Item {
    /*
     * Constructor
     * @param itemCode
     * @param itemName
     * @param catalogCategory
     * @param description
     * @param rating
     * @param getimageURL
     */
    constructor(itemCode, itemName, catalogCategory, description, rating, getimageURL) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._catalogCategory = catalogCategory;
        this._description = description;
        this._rating = rating;
        this._getimageURL = getimageURL;
    }


    /*
     *
     * Getter and Setters
    */

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get catalogCategory() {
        return this._catalogCategory;
    }

    set catalogCategory(value) {
        this._catalogCategory = value;
    }


    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    get getimageURL() {
        return this._getimageURL;
    }

    set getimageURL(value) {
        this._getimageURL = value;
    }

}

module.exports.Item = Item;
module.exports.ItemModel = mongoose.model('ItemData',itemSchema);

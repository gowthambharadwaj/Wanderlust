var Item = require('../model/item');

module.exports.getItems = function () {

    let items = [];
    for (let i = 0; i < data.length; i++) {
        let item = new Item(data[i].itemCode,
            data[i].itemName,
            data[i].catalogCategory,
            data[i].description,
            data[i].rating,
            data[i].getimageURL);

        items.push(item);

    } // end of for

    return items;

    // return data;
};

/**
 *
 * @param itemCode
 * @returns {*}
 */
module.exports.getItem = function (itemCode) {
    console.info("from DB, Item code :" + itemCode)
    for (var i = 0; i < data.length; i++) {
        // var itemCode = data.itemCode;
        //console.log("Data" + JSON.stringify(data[i].getimageURL));
        if (parseInt(data[i].itemCode) == itemCode) {
            let item = new Item(data[i].itemCode,
                data[i].itemName,
                data[i].catalogCategory,
                data[i].description,
                data[i].rating,
                data[i].getimageURL);

            //console.log("Item"+JSON.stringify(item));

            return item;
        }
        // console.log("Data"+i);

    }
};

// Hard coded data
var data = [
    {
        itemCode: 1,
        itemName: "Rock Beach",
        catalogCategory: "Sightseeing",
        description: "The Rock Beach located in the east coast of India has a very scenic beauty. The major attractions include the sunrise and the sunset along the beach, French war memorial, Customs office, various multi cuisine restaurants.The beach is located along the White Town in the national territory.There are many modes of transportation to reach Pondicherry. Visitors could take flights to reach Pondicherry flying from Bengaluru and Hyderabad. Tri weekly train service is available to the city in addition to daily service to Villipuram that is 35km from pondicherry. Best available connectivity is by the road. Visitors could either choose public bus transportation from major cities or could choose to drive to Pondicherry by their own vehicles. Visitors who reach the city by public transportation could avail vehicles on rental basis.",
        rating: 5,
        getimageURL: "/images/Rock_Beach.jpg",

    },
    {
        itemCode: 2,
        itemName: "Driving",
        catalogCategory: "Sightseeing",
        description: "The romance of Route 66 continues to captivate people around the world. Running between Chicago and Los Angeles, “over two thousand miles all the way” in the words of the popular R&B anthem, this legendary old road passes through the heart of the United States on a diagonal trip that takes in some of the country’s most archetypal roadside scenes. If you’re looking for great displays of neon signs, rusty middle-of-nowhere truck stops, or kitschy Americana, do as the song says and “get your kicks on Route 66.Though it is no longer a main route across the country, Route 66 has retained its mystique in part due to the very same effective hype, hucksterism, and boosterism that animated it through its half-century heyday. It was a Route 66 sight, the marvelous Meramec Caverns, that gave the world the bumper sticker. And it was here on Route 66 that the great American driving vacation first flourished. Billboards and giant statues along the highway still hawk a baffling array of roadside attractions, tempting passing travelers to view giant blue whales, to see live rattlesnakes and other wild creatures on display in roadside menageries, or to stay at “Tucumcari Tonite.",
        rating: 4,
        getimageURL: "/images/Route66.jpg",
    },


    {
        itemCode: 3,
        itemName: "Doodhsagar Falls",
        catalogCategory: "Sightseeing",
        description: "Dudhsagar Falls (literally Sea of Milk ) is a four-tiered waterfall located on the Mandovi River in the Indian state of Goa. It is 60 km from Panaji by road and is located on the Madgaon-Belagavi rail route about 46 km east of Madgaon and 80 km south of Belagavi. Dudhsagar Falls is amongst India's tallest waterfalls with a height of 310 m (1017 feet) and an average width of 30 metres (100 feet). The falls is located in the Bhagwan Mahaveer Sanctuary and Mollem National Park among the Western Ghats. The waterfall forms the border between Karnataka and Goa states. The area is surrounded by a deciduous forests with a rich biodiversity. The falls are not particularly spectacular during the dry season but during the monsoon season however, the falls are fed by rains and form a huge force of water. There has been a lot of hype of Dudhsagar trek being closed for the general public. The Dudhsagar railway trek has been officially closed for the general public but the trek to the Dudhsagar falls bottom is still open for all. There are two routes to reach there. One is starting the trek from Kulem and follow the jeep trail until the bottom of the waterfall. The second option is via the railway track. You can trek up to the Sonaulim station and join back to the Mud route. This route would save 2 km on the Mud road.",
        rating: 5,
        getimageURL: "/images/Doodhsagar.jpg",
    },


    {
        itemCode: 4,
        itemName: "kumaraparvatha",
        catalogCategory: "Adventure",
        description: "Kumara Parvatha, at 1,712 metres (5,617 ft), is the highest peak in Pushpagiri Wildlife Sanctuary in the Western Ghats of Karnataka. It is located in the Somwarpet Taluk, 20 kilometres (12 mi) from Somwarpet in the northern part of Kodagu district on the border between Dakshina Kannada and Kodagu district and hassan districts. It is 4th highest peak of Karnataka. The Sanskrit name of the mountain is Puṣpagiri while its Prakrit form is Puphagiri, which is mentioned in the Nagarjunakond Second Apsidal Temple inscription[3], although this may refer to a different mountain to the north of Cuddapah, in Andhra Pradesh. The Pushpagiri or Subramanya Hills (also referred as Kumaraparvatha) is the second-highest peak of Kodagu, and fourth highest peak in Karnataka. About 36 kilometres (22 mi) from Somwarpet and 1.5 kilometres (0.93 mi) from Kumaralli, it is located amid the jungle. Trekking can be done from the base, Bhagati, which is a 10 km, three-hour walk. Otherwise, trekkers can cross Kukke Subramanya, located in Dakshina Kannada district of Pushpagiri Range. The trekking zone can be approached from Pushpagiri or from Kumaraparvata peaks.The climate is generally cool and wet. The climate is that of a highland, with no extreme variations. It receives heavy rainfall between June to September. From October to December the area is covered in mist almost all the time.",
        rating: 5,
        getimageURL: "/images/kumaraparvatha.jpg",
    },

    {
        itemCode: 5,
        itemName: "Para Sailing",
        catalogCategory: "Adventure",
        description: "Enjoy the Key West sunshine on a full-day catamaran excursion, and take part in a range of watersports, too. As you cruise around the alluring Gulf of Mexico, you’ll gaze out at the scenery and spot local marine life. Choose from a range of activities from snorkeling and kayaking to adrenaline-fuelled parasailing or jetting around by WaveRunner. Breakfast and lunch are served on board. Leave Key West’s Historic Seaport by catamaran, and cruise out onto the waters of the Gulf of Mexico. With calm seas and toasty temperatures, the body of water is perfect for a daytime cruise. Choose to bask on deck and sunbathe, or take part in several included watersports activities. Use snorkel gear to admire sub-tropical scenes below the water, or take part in a parasailing trip for adrenaline and incredible views in equal measure. Shoot off from the boat in a WaveRunner, or take a more leisurely approach with a kayak around nearby mangroves. In between activities, make sure you find time to eat! Breakfast and lunch are included on board, with local delicacies like golden-fried chicken and steamed shrimp. Your full-day experience ends back at the Historic Seaport start point.",
        rating: 3,
        getimageURL: "/images/parasailing.jpg",
    },

    {
        itemCode: 6,
        itemName: "Macau Tower",
        catalogCategory: "Adventure",
        description: "Be part of a Guinness World Record in the Sky of Macau! The AJ Hackett Macau Tower Bungy Jump is 233m / 764ft high, making this jump a Guinness World Record for the Highest Commercial Bungy Jump in the world. In order to make this jump from the Macau Tower a reality, a specially designed bungy cord, guide cables, and recovery system had to be developed. AJ and his team spearheaded the new design and testing of all equipment and in doing so invented what his organization is now referring to as the 2nd generation bungy cord. This is a sphere shaped cord that is larger at the top than the bottom and allows jumper weights to be evenly dispersed over the entire length of the cord when jumping from such a height. “Designing this new bungy cord is a major step forward for us. It will now allow us to jump from any building or structure in the world” says Founder AJ Hackett. Jumpers leap from a platform 233m above the ground and experience the ultimate free fall experience before slowing down 30 meters from the ground and rebounding back up. The guide cables system ensure you do not make contact with the tower and enable bungy jumps to happen in nearly all weather conditions. Night Bungy is also available from 6pm in winter and 7.30pm in summer check out our opening hours below for details or inquire here. Since the dawn of time man has battled with fear. Since the dawn of time man has dreamed of flying. Realize your dreams and conquer your fears",
        rating: 4,
        getimageURL: "/images/macautower.jpg",
    },
];

var category = ["Sightseeing", "Adventure"];

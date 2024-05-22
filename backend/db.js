const mongoose = require('mongoose');
const mongoURI = 'mongodb://sarbjeetsembhi28:Yv15JsPwUXvKaYmA@ac-rm9skec-shard-00-00.mpg0nir.mongodb.net:27017,ac-rm9skec-shard-00-01.mpg0nir.mongodb.net:27017,ac-rm9skec-shard-00-02.mpg0nir.mongodb.net:27017/gofood?ssl=true&replicaSet=atlas-ag28ww-shard-0&authSource=admin&retryWrites=true&w=majority&appName=go-food';

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true

      // connectTimeoutMS: 30000, // 30 seconds
      // socketTimeoutMS: 45000, // 45 seconds
    });
    console.log('Connected to MongoDB');
    // Access the "food_items" collection directly without a defined schema
    const FoodItem = mongoose.connection.db.collection('food_items');
    const FoodCategory=  mongoose.connection.db.collection('food_category');

    // Fetch all documents from the "food_items" collection
    const fetchedData = await FoodItem.find({}).toArray();
    const fetchFoodCategory = await FoodCategory.find({}).toArray();
    // console.log();
    global.food_items = fetchedData;
    global.food_category = fetchFoodCategory;
    // console.log(global.food_items);
    // console.log('Fetched Data:', fetchedData);

    // const fetched_data= await mongoose.Connection.db.collection("food_items");
    // fetched_data.find({}).toArray(function(err,data){
    //     if(err)console.log(err);
    //     else console.log(data);
    // })

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

module.exports = connectToMongoDB;

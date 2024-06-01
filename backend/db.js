const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://quickbite:quickbite123@merncluster.jqydhig.mongodb.net/quickbitemern?retryWrites=true&w=majority&appName=mernCluster";

const connect = async () => {
  await mongoose
    .connect(mongoURI)
    .then(async () => {
      console.log("DB Established");
      const fetched_data = await mongoose.connection.db
        .collection("food_items")
        .find({})
        .toArray();
      global.food_items = fetched_data;
      const food_category = await mongoose.connection.db
      .collection("food_category")
      .find({})
      .toArray();
      global.food_category = food_category;
      
    })
    
    .catch((e) => {
      message: "Error Was Occured";
    });
};

module.exports = { connect };

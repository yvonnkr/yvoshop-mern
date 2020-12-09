import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //clear exiting data from collection before adding
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);

    console.log(`Data Imported!`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(`Data Destroyed!`.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

// check process arg
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

/**
 * To Run
 * (-d for destroyData() else importData()) --added script on package.json
 * node backend/seeder
 * node backend/seeder -d
 *  */

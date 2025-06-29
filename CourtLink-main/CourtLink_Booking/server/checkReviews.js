import mongoose from "mongoose";
import Review from "./models/review.model.js";
import User from "./models/user.model.js";
import Turf from "./models/turf.model.js";
import dotenv from "dotenv";

dotenv.config();

const checkReviews = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check total reviews
    const totalReviews = await Review.countDocuments();
    console.log(`Total reviews in database: ${totalReviews}`);

    if (totalReviews > 0) {
      // Get a sample review
      const sampleReview = await Review.findOne().populate('user', 'name email').populate('turf', 'name location');
      console.log("Sample review:", JSON.stringify(sampleReview, null, 2));
    } else {
      console.log("No reviews found in database");
    }

    // Check if there are any users and turfs
    const userCount = await User.countDocuments();
    const turfCount = await Turf.countDocuments();
    
    console.log(`Total users: ${userCount}`);
    console.log(`Total turfs: ${turfCount}`);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

checkReviews(); 
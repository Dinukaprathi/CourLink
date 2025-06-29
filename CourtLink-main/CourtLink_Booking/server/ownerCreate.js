import * as argon2 from "argon2";
import mongoose from "mongoose";
import Owner from "./models/owner.model.js";
import dotenv from "dotenv";
dotenv.config();

const createOwners = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Prepare users with hashed passwords
    const owners = [
      {
        _id: new mongoose.Types.ObjectId().toString(),
        name: "Dinuka Prathiraja",
        email: "dinukatharana@gmail.com",
        password: "Dinuka@123",
        phone: "0755035806",
        role: "owner",
      },
      {
        _id: new mongoose.Types.ObjectId().toString(),
        name: "Dinuka Prathiraja",
        email: "dinuka@gmail.com",
        password: "Dinuka@123",
        phone: "0755035806",
        role: "admin",
      },
    ];

    // Save each owner to the DB
    for (const owner of owners) {
      const newOwner = new Owner(owner);
      await newOwner.save();
      console.log(`Owner created: ${owner.name} (${owner.role})`);
    }

  } catch (error) {
    console.error("Error creating owners:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
};

createOwners();

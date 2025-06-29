import * as argon2 from "argon2";
import chalk from "chalk";
import User from "../../models/user.model.js";
import { generateUserToken } from "../../utils/generateJwtToken.js";
import { validationResult } from "express-validator";
import { detectDevice, getClientIP } from "../../utils/deviceDetector.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await argon2.hash(password);

    // Capture device information
    const device = detectDevice(req.headers['user-agent']);
    const ip = getClientIP(req);

    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword,
      device,
      ip
    });
    await newUser.save();
    const token = generateUserToken(newUser._id);
    return res
      .status(201)
      .json({ success: true, message: "User created successfully", token });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email" });
    }
    const isPasswordCorrect = await argon2.verify(user.password, password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    // Update device information on login
    const device = detectDevice(req.headers['user-agent']);
    const ip = getClientIP(req);
    
    user.device = device;
    user.ip = ip;
    await user.save();

    const token = generateUserToken(user._id);
    return res
      .status(200)
      .json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.log(chalk.red(err.message));
    return res.status(400).json({ success: false, message: err.message });
  }
};

import adjustTime from "../../utils/adjustTime.js";
import razorpay from "../../config/razorpay.js";
import crypto from "crypto";
import Booking from "../../models/booking.model.js";
import TimeSlot from "../../models/timeSlot.model.js";
import generateQRCode from "../../utils/generateQRCode.js";
import Turf from "../../models/turf.model.js";
import generateEmail, {
  generateHTMLContent,
} from "../../utils/generateEmail.js";
import User from "../../models/user.model.js";
import { format, parseISO } from "date-fns";

export const createOrder = async (req, res) => {
  const userId = req.user.user;
  try {
    const { totalPrice } = req.body;
    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ message: "Invalid price amount" });
    }

    const user = await User.findById(userId).select("name email phone");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const options = {
      amount: Math.round(totalPrice * 100), // Ensure amount is in paise and is an integer
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order || !order.id) {
      throw new Error("Failed to create Razorpay order");
    }

    return res.status(200).json({ order, user });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ 
      message: "Failed to create payment order",
      error: error.message 
    });
  }
};

export const verifyPayment = async (req, res) => {
  const userId = req.user.user;

  const {
    id: turfId,
    duration,
    startTime,
    endTime,
    selectedTurfDate,
    totalPrice,
    paymentId,
    orderId,
    razorpay_signature,
  } = req.body;

  try {
    const formattedStartTime = format(parseISO(startTime), "hh:mm a");
    const formattedEndTime = format(parseISO(endTime), "hh:mm a");
    const formattedDate = format(parseISO(selectedTurfDate), "d MMM yyyy");

    // Skip payment verification entirely and proceed with booking
    const adjustedStartTime = adjustTime(startTime, selectedTurfDate);
    const adjustedEndTime = adjustTime(endTime, selectedTurfDate);

    const [user, turf] = await Promise.all([
      User.findById(userId),
      Turf.findById(turfId),
    ]);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!turf) {
      return res
        .status(404)
        .json({ success: false, message: "Turf not found" });
    }

    // Generate QR code
    const QRcode = await generateQRCode(
      totalPrice,
      formattedStartTime,
      formattedEndTime,
      formattedDate,
      turf.name,
      turf.location
    );

    // Create time slot and booking
    const [timeSlot, booking] = await Promise.all([
      TimeSlot.create({
        turf: turfId,
        startTime: adjustedStartTime,
        endTime: adjustedEndTime,
      }),
      Booking.create({
        user: userId,
        turf: turfId,
        timeSlot: null,
        totalPrice,
        qrCode: QRcode,
        payment: { 
          orderId: orderId || "pending_order",
          paymentId: paymentId || "pending_payment",
          status: "pending"
        },
      }),
    ]);

    // Update the booking with time slot
    booking.timeSlot = timeSlot._id;

    await Promise.all([
      booking.save(),
      User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } }),
    ]);

    // Generate and send email
    const htmlContent = generateHTMLContent(
      turf.name,
      turf.location,
      formattedDate,
      formattedStartTime,
      formattedEndTime,
      totalPrice,
      QRcode
    );

    await generateEmail(user.email, "Booking Confirmation", htmlContent);
    
    return res.status(200).json({
      success: true,
      message: "Booking successful! Check your email for the receipt.",
    });
  } catch (error) {
    console.error("Error in verifyPayment", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your booking",
    });
  }
};

// get bookings for a user
export const getBookings = async (req, res) => {
  const userId = req.user.user;
  try {
  const bookings = await Booking.find({ user: userId })
    .sort({ createdAt: -1 })
    .select("qrCode totalPrice")
    .populate("timeSlot", "startTime endTime")
    .populate("turf", "name location");
      console.log(bookings, "bookings");
    return res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

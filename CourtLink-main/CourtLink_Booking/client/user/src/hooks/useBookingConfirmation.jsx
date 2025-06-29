import { format, parse, set, addHours, formatISO, parseISO } from "date-fns";
import toast from "react-hot-toast";
import axiosInstance from "./useAxiosInstance";
import { createOrder, handlePayment } from "../config/razorpay";
import { useNavigate } from "react-router-dom";

const useBookingConfirmation = (
  id,
  selectedDate,
  selectedStartTime,
  duration,
  pricePerHour,
  setLoading
) => {
  const navigate = useNavigate();

  const confirmReservation = async () => {
    const selectedTurfDate = format(selectedDate, "yyyy-MM-dd");
    const parsedStartTime = parse(selectedStartTime, "hh:mm a", new Date());

    const combinedStartDateTime = set(parseISO(selectedTurfDate), {
      hours: parsedStartTime.getHours(),
      minutes: parsedStartTime.getMinutes(),
      seconds: 0,
      milliseconds: 0,
    });

    const combinedEndDateTime = addHours(combinedStartDateTime, duration);

    const startTimeISO = formatISO(combinedStartDateTime);
    const endTimeISO = formatISO(combinedEndDateTime);

    try {
      setLoading(true);

      const order = await createOrder(pricePerHour * duration);
      setLoading(false);

      // Handle payment with Razorpay and proceed without checking the actual payment response
      const razorpayResponse = await handlePayment(order.order, order.user);
      setLoading(true);
      
      // Construct the booking data
      const bookingData = {
        id,
        duration,
        startTime: startTimeISO,
        endTime: endTimeISO,
        totalPrice: pricePerHour * duration,
        selectedTurfDate,
        paymentId: razorpayResponse.razorpay_payment_id,
        orderId: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
      };

      // Send the booking confirmation request to the server
      const response = await axiosInstance.post(
        "/api/user/booking/verify-payment",
        bookingData
      );
      const result = await response.data;

      // Display success message and navigate to booking history
      toast.success(result.message);
      navigate("/auth/booking-history");
    } catch (err) {
      if (err.response) {
        toast.error(err.response?.data?.message || "An error occurred");
      } else {
        toast.error("An error occurred during the booking process.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    confirmReservation,
  };
};

export default useBookingConfirmation;

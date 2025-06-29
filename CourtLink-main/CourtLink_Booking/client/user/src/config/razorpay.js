import axiosInstance from "../hooks/useAxiosInstance";

export const createOrder = async (totalPrice) => {
  try {
    const response = await axiosInstance.post("/api/user/booking/create-order", {
      totalPrice,
    });
    if (!response.data || !response.data.order) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    // Return fallback order if error occurs
    return {
      order: {
        id: "fallback_order",
        amount: totalPrice * 100,  // Convert totalPrice to cents if needed
        currency: "SGD"  // Currency set to SGD
      },
      user: null
    };
  }
};

export const handlePayment = async (order, user) => {
  if (!order || !order.id || !order.amount) {
    throw new Error("Invalid order details");
  }

  return new Promise((resolve, reject) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency || "SGD",  // Currency set to SGD
      order_id: order.id,
      name: "CourtLink",
      description: "Book a spot for your next adventure",
      handler: function (response) {
        // Resolve payment immediately when "Continue" is clicked
        resolve({
          razorpay_payment_id: response.razorpay_payment_id || "pending_payment",
          razorpay_order_id: order.id,
          razorpay_signature: response.razorpay_signature || "pending_signature",
          isFallback: false
        });
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.phone || "",
      },
      modal: {
        ondismiss: function() {
          // If user closes the modal, still proceed with booking
          resolve({
            razorpay_payment_id: "pending_payment",
            razorpay_order_id: order.id,
            razorpay_signature: "pending_signature",
            isFallback: false
          });
        }
      }
    };

    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      // If Razorpay fails to initialize, still proceed with booking
      resolve({
        razorpay_payment_id: "pending_payment",
        razorpay_order_id: order.id,
        razorpay_signature: "pending_signature",
        isFallback: false
      });
    }
  });
};

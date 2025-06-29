import Review from "../../models/review.model.js";
import User from "../../models/user.model.js";
import Turf from "../../models/turf.model.js";

// Get all reviews with populated user and turf data
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user', 'name email')
      .populate('turf', 'name location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews: reviews,
      total: reviews.length
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message
    });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const review = await Review.findByIdAndDelete(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message
    });
  }
}; 
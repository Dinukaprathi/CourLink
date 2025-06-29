import { Router } from "express";
import { getAllReviews, deleteReview } from "../../controllers/admin/reviews.controller.js";

const reviewsRouter = Router();

// Get all reviews
reviewsRouter.get("/", getAllReviews);

// Delete a review
reviewsRouter.delete("/:reviewId", deleteReview);

export default reviewsRouter; 
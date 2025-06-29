import { useEffect, useState } from "react";
import axiosInstance from "./useAxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useReviews = (turfId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/user/reviews/${turfId}`);
      const result = response.data;
      setReviews(result.reviews);
      if (result.reviews.length > 0) {
        const avg = result.reviews.reduce((sum, r) => sum + r.rating, 0) / result.reviews.length;
        setAverageRating(avg);
      } else {
        setAverageRating(0);
      }
    } catch (err) {
      console.log(err, "error");
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const addReview = async ({ rating, comment }) => {
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post(`/api/user/reviews/${turfId}`, { 
        rating, 
        review: comment 
      });
      setReviews(prev => [res.data.review, ...prev]);
      toast.success("Review added successfully!");
      // Refresh reviews to get updated average rating
      fetchReviews();
    } catch (err) {
      console.error("Error adding review:", err);
      if (err.response?.status === 401) {
        toast.error("Please login to submit a review");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Failed to add review");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { reviews, loading, addReview, isSubmitting, averageRating };
};

export default useReviews;

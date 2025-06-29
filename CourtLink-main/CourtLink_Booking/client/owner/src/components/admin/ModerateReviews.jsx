import { useEffect, useState } from "react";
import axiosInstance from "../../hooks/useAxiosInstance";

const ModerateReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/admin/reviews");
      console.log("Reviews response:", res.data); // Debug log
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews:", err.response || err);
      setError(err.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/admin/reviews/${reviewId}`);
      // Refresh the reviews list
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Moderate Reviews</h2>
        <div className="flex items-center justify-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Moderate Reviews</h2>
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Moderate Reviews</h2>
        <div className="badge badge-primary">{reviews.length} Reviews</div>
      </div>
      
      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No reviews found.</div>
          <div className="text-sm text-gray-400 mt-2">Reviews will appear here once users start rating turfs.</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>User</th>
                <th>Turf</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>
                    <div>
                      <div className="font-bold">{review.user?.name || "Anonymous"}</div>
                      <div className="text-sm opacity-50">{review.user?.email || "No email"}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-semibold">{review.turf?.name || "Unknown Turf"}</div>
                      <div className="text-sm opacity-50">{review.turf?.location || "No location"}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="rating rating-sm">
                        {[...Array(5)].map((_, index) => (
                          <input
                            key={index}
                            type="radio"
                            className="mask mask-star-2 bg-orange-400"
                            checked={index < review.rating}
                            readOnly
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{review.rating}/5</span>
                    </div>
                  </td>
                  <td>
                    <div className="max-w-xs">
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm opacity-70">
                      {new Date(review.createdAt).toLocaleDateString()}
                      <br />
                      {new Date(review.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ModerateReviews; 
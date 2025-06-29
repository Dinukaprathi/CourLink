import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useTurfData from "../../hooks/useTurfData";
import useReviews from "../../hooks/useReviews";
import Reviews from "../reviews/Reviews";
import TurfDetailsSkeleton from "../ui/TurfDetailsSkeleton";
import { MapPin, Clock, Activity, IndianRupee } from "lucide-react";
import WriteReview from "../reviews/WriteReview";

const TurfDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, turfs } = useTurfData();
  const { averageRating, reviews } = useReviews(id);
  const [showModal, setShowModal] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const { addReview, isSubmitting } = useReviews(id);

  if (loading) {
    return <TurfDetailsSkeleton />;
  }

  const turf = turfs.find((t) => t._id === id);

  if (!turf) {
    return (
      <div className="alert alert-warning shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Turf not found</span>
        </div>
      </div>
    );
  }

  const handleReservation = () => {
    if (isLoggedIn) {
      navigate(`/auth/reserve/${id}`);
    } else {
      navigate(`/login`);
    }
  };

  const handleAddReview = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setRating(0);
    setReview("");
  };
  const handleSubmit = async () => {
    await addReview({ rating, comment: review });
    handleCloseModal();
  };

  // Calculate rating breakdown
  const ratingCounts = [5, 4, 3, 2, 1].map(star =>
    reviews ? reviews.filter(r => r.rating === star).length : 0
  );
  const totalReviews = reviews ? reviews.length : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-in-left">
        <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden flex flex-col">
          <div className="relative h-96">
            <img
              src={turf.image || "/banner-1.png"}
              alt={turf.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-white">{turf.name}</h2>
              <div className="flex items-center space-x-2 text-white">
                <MapPin className="w-4 h-4" />
                <p className="text-sm">{turf.location}</p>
              </div>
              <button
                className="btn btn-primary mt-4 w-max"
                onClick={handleAddReview}
                style={{ alignSelf: 'flex-end' }}
              >
                Add Review
              </button>
            </div>
            {showModal && (
              <WriteReview
                rating={rating}
                review={review}
                isSubmitting={isSubmitting}
                onClose={handleCloseModal}
                onRatingChange={setRating}
                onReviewChange={e => setReview(e.target.value)}
                onSubmit={handleSubmit}
              />
            )}
          </div>
          <div className="mt-4 px-6 pb-6">
            <h4 className="text-xl font-bold mb-4">Rating Overview</h4>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold text-yellow-500">{averageRating ? averageRating.toFixed(1) : "0.0"}</span>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{totalReviews} Reviews</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-yellow-400' : 'fill-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star, idx) => {
                const count = ratingCounts[5 - star];
                const percent = totalReviews ? (count / totalReviews) * 100 : 0;
                const barColor = [
                  "bg-yellow-400",
                  "bg-green-400",
                  "bg-blue-400",
                  "bg-orange-400",
                  "bg-red-400"
                ][idx];
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-8 text-sm font-semibold">{star}★</span>
                    <div className="w-72 h-3 rounded bg-gray-200 overflow-hidden">
                      <div className={`h-3 ${barColor}`} style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="w-8 text-sm text-gray-600">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bg-base-100 shadow-xl rounded-lg p-6 flex flex-col justify-between">
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="text-2xl font-bold">Rating</h3>
            <div className="rating rating-md">
              {averageRating ? (
                [1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked={star === Math.round(averageRating)}
                    readOnly
                  />
                ))
              ) : (
                <p className="text-sm opacity-70">No reviews yet</p>
              )}
            </div>
            {averageRating && (
              <span className="text-lg">({averageRating.toFixed(1)})</span>
            )}
          </div>
          <p className="text-lg mb-6">{turf.description}</p>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <InfoItem
              icon={<IndianRupee />}
              label="Price per Hour"
              value={`LKR ${turf.pricePerHour}`}
            />
            <InfoItem
              icon={<Activity />}
              label="Sports"
              value={turf.sportTypes.join(", ")}
            />
            <InfoItem
              icon={<Clock />}
              label="Open Time"
              value={turf.openTime}
            />
            <InfoItem
              icon={<Clock />}
              label="Close Time"
              value={turf.closeTime}
            />
          </div>
          <div className="card-actions">
            <button
              className="btn btn-primary btn-lg w-full"
              onClick={handleReservation}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
         <Reviews turfId={id} />
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-primary bg-opacity-10 p-3 rounded-full">
      {React.cloneElement(icon, { className: "w-6 h-6 text-primary" })}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  </div>
);

export default TurfDetails;

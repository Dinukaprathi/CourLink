import { useState } from "react";
import useReviews from "../../hooks/useReviews";
import { format } from "date-fns";
import ReviewSkeleton from "../ui/ReviewSkeleton";
import { ChevronDown } from "lucide-react";
import WriteReview from "./WriteReview";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const REVIEWS_PER_PAGE = 5;

// Helper function to abbreviate name
function abbreviateName(name) {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1][0]}.`;
}

const Reviews = ({ turfId }) => {
  const { reviews, loading, addReview, isSubmitting } = useReviews(turfId);
  const [displayCount, setDisplayCount] = useState(REVIEWS_PER_PAGE);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  if (loading) return <ReviewSkeleton />;

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + REVIEWS_PER_PAGE);
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

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
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
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            autoHeight={true}
            className="rounded-lg shadow-lg bg-base-100"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="p-6 flex flex-col gap-2 min-h-[120px] ml-12">
                  <div className="flex items-center gap-3 mb-2">
                    {review.user?.profilePic ? (
                      <img
                        src={review.user.profilePic}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border border-gray-200">
                        <svg className="w-7 h-7 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c0-4 8-4 8-4s8 0 8 4v1H4v-1z" />
                        </svg>
                      </span>
                    )}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          {abbreviateName(review.user?.name || "Anonymous")}
                        </span>
                        <span className="text-yellow-400">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">
                        {format(new Date(review.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg ml-2 mt-2">{review.comment}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom navigation arrows outside the content */}
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center cursor-pointer">
            <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </div>
          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center cursor-pointer">
            <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;

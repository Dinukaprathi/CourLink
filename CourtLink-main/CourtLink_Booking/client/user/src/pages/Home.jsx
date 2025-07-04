import { Link } from "react-router-dom";
import Carousel from "../components/common/Carousel";
import Footer from "../components/layout/Footer";
import useTurfData from "../hooks/useTurfData";
import TurfCard from "../components/turf/TurfCard";
import TurfCardSkeleton from "../components/ui/TurfCardSkeleton";
import { useSelector } from "react-redux";
import banner1 from "/banner-1.png";
import banner2 from "/banner-2.jpeg";
import banner3 from "/banner-3.jpeg";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { turfs, loading } = useTurfData();
  const slides = [banner1, banner2, banner3];

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse animate-slide-in-right">
          <div className="w-full lg:w-1/2">
            <Carousel slides={slides} />
          </div>
          <div className="w-full lg:w-1/2 animate-zoom-in">
            <h1 className="text-5xl font-bold">Welcome to CourtLink</h1>
            <p className="py-6">
              Discover and book the best turf fields in your area. Whether
              you're planning a casual game or a tournament, CourtLink has
              got you covered.
            </p>
            <div className="flex gap-4">
              <Link
                to={isLoggedIn ? "/auth/turfs" : "/signup"}
                className="btn btn-accent"
              >
                Get Started
              </Link>
              {isLoggedIn && (
                <Link to="/auth/booking-history" className="btn btn-primary">
                  My Bookings
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 animate-slide-in-left">
        <h2 className="text-3xl font-bold mb-6">Featured Turfs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TurfCardSkeleton key={`skeleton-${index}`} />
              ))
            : turfs
                .slice(0, 3)
                .map((turf) => <TurfCard key={turf._id} turf={turf} />)}
        </div>
        <div className="text-center mt-8">
          <Link
            to={isLoggedIn ? "/auth/turfs" : "/turfs"}
            className="btn btn-primary"
          >
            View More Turfs
          </Link>
        </div>
      </div>

      {/* New Booking Promotion Section */}
      <div className="bg-base-200 py-12 mt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Easy Turf Booking</h2>
            <p className="text-lg mt-2">
              Book your favorite turf in just a few clicks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">1</div>
                <h3 className="card-title">Choose Your Turf</h3>
                <p>Browse our selection of premium turf facilities</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">2</div>
                <h3 className="card-title">Select Date & Time</h3>
                <p>Pick your preferred slot with our easy calendar</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">3</div>
                <h3 className="card-title">Confirm Booking</h3>
                <p>Secure your spot with instant confirmation</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              to={isLoggedIn ? "/auth/turfs" : "/signup"}
              className="btn btn-accent btn-lg"
            >
              Start Booking Now
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
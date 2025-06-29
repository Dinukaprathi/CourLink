import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TurfCard = ({ turf }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="card bg-base-100 shadow-xl animate-bounce-fade-in group">
      <figure className="relative">
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-48 object-cover"
        />
        {typeof turf.averageRating === 'number' && (
          <div className="absolute top-3 right-3 z-10">
            <div className="overflow-hidden">
              <div className="flex items-center bg-white bg-opacity-90 rounded-full px-4 py-1 shadow-lg transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <span className="text-yellow-500 font-bold mr-1 flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(turf.averageRating) ? 'fill-yellow-400' : 'fill-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  ))}
                </span>
                <span className="ml-2 text-base font-semibold text-gray-800 transition-opacity duration-500 group-hover:opacity-100 opacity-0">
                  {turf.averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{turf.name}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {turf.sportTypes.map((sport, index) => (
            <span key={index} className="badge badge-outline">
              {sport}
            </span>
          ))}
        </div>
        <p className="mt-2">
          Open: {turf.openTime} - {turf.closeTime}
        </p>
        <div className="card-actions justify-end mt-4">
          <Link
            to={isLoggedIn ? `/auth/turf/${turf._id}` : `/turf/${turf._id}`}
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;

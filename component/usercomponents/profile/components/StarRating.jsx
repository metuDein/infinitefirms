// components/StarRating.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as farStar,
} from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating }) => {
  const totalStars = 5; // Total number of stars in the rating system
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating % 1 !== 0; // Check if there is a half star
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex">
      {Array.from({ length: fullStars }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className="text-yellow-200"
          style={{
            color: "#ECBA39",
          }}
        />
      ))}
      {halfStar && (
        <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-200" />
      )}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <FontAwesomeIcon key={index} icon={farStar} className="text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;

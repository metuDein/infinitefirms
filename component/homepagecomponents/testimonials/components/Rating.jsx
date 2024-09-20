import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Rating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <FontAwesomeIcon
            key={index}
            icon={hover >= index || rating >= index ? faStar : faStarRegular}
            color={hover >= index || rating >= index ? "gold" : "gray"}
            size="lg"
            onMouseOver={() => setHover(index)}
            onMouseOut={() => setHover(0)}
            onClick={() => setRating(index)}
            style={{ cursor: "pointer" }}
          />
        );
      })}
      <p>Rating: {rating}/5</p>
    </div>
  );
};

export default Rating;

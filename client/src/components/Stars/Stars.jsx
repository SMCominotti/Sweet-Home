import { useState } from "react";
import { FaStar } from "react-icons/fa";

function Stars(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              className="hidden"
              name="rating"
              value={currentRating}
              onClick={() => {
                setRating(currentRating);
                props.handleRating(currentRating); //
              }}
            />
            <FaStar
              className="star cursor-pointer"
              size={15}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>Your rating is {rating}</p>
    </div>
  );
}

export default Stars;

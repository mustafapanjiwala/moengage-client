// Rating.js
import React, { useState } from "react";
import "./Rating.css"; // Import your CSS for styling

const Rating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onChange(value); // Call the onChange callback to pass the selected rating to the parent component
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${value <= rating ? "active" : ""}`}
          onClick={() => handleClick(value)}
        >
          &#9733; {/* Unicode for a star character */}
        </span>
      ))}
    </div>
  );
};

export default Rating;

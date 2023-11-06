import React from "react";
import "./BreweryDetailSkeleton.css"; // Import your CSS for styling

const BreweryDetailSkeleton = () => {
  return (
    <div className="skeleton">
      <div className="skeleton-heading"></div>
      <div className="skeleton-content">
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
      </div>
      <div className="skeleton-reviews"></div>
    </div>
  );
};

export default BreweryDetailSkeleton;

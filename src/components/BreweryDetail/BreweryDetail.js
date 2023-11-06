import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./BreweryDetail.css";
import BreweryDetailSkeleton from "../BreweryDetailSkeleton/BreweryDetailSkeleton.js";
import { UserContext } from "../../user_context.js";
import { BASE_URL } from "../../config.local.js";

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState({});
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const { user, logout } = useContext(UserContext);

  const [rating, setRating] = useState(0);

  const history = useNavigate();

  const handleClick = (value) => {
    setRating(value);
  };

  const handleLogout = () => {
    logout();
    history("/");
  };

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/reviews/` + id);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/breweries/${id}`
        );
        setBrewery(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brewery data: ", error);
      }
    };

    fetchReviews();

    fetchBrewery();
  }, [id, fetchReviews]);

  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        email: user.email,
        rating: rating,
        review: reviewText,
        breweryId: id,
      };
      // eslint-disable-next-line
      const response = await axios.post(`${BASE_URL}/api/reviews/`, reviewData);
      fetchReviews();
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  return (
    <div className="brewery-detail-container">
      {loading ? (
        <BreweryDetailSkeleton />
      ) : (
        <>
          <div className="brewery-detail-head">
            <h2>{brewery.name}</h2>
            <button onClick={handleLogout} className="brewery-detail-logout">
              Logout
            </button>
          </div>

          <div className="brewery-details">
            <p>
              <strong>Address:</strong> {brewery.street}, {brewery.city},{" "}
              {brewery.state} {brewery.postal_code}
            </p>
            <p>
              <strong>Phone:</strong> {brewery.phone}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={brewery.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {brewery.website_url}
              </a>
            </p>

            <p>
              <strong>Brewery Type:</strong> {brewery.brewery_type}
            </p>
            <p>
              <strong>City:</strong> {brewery.city}
            </p>
            <p>
              <strong>State:</strong> {brewery.state_province}
            </p>
            <p>
              <strong>Country:</strong> {brewery.country}
            </p>
          </div>

          <div className="review-input-section">
            <h3>Write a Review</h3>
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
            <textarea
              className="review-textarea"
              placeholder="Write your review here"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <button
              className="review-submit-button"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
          </div>

          <div className="review-section">
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
              <>
                {reviews
                  .map((review, index) => (
                    <div className="review-card" key={index}>
                      <div className="email-pfp">
                        <img src="/pfp.jpg" alt="Profile" />
                        <h3 className="reviewer-email">{review.email}</h3>
                      </div>
                      <div className="rating">
                        {new Array(review.rating).fill(1).map((value) => (
                          <span
                            key={value}
                            disabled={true}
                            style={{ color: "#ffc107" }}
                          >
                            &#9733; {/* Unicode for a star character */}
                          </span>
                        ))}
                      </div>
                      <p className="review-text">{review.review}</p>
                    </div>
                  ))
                  .reverse()}
              </>
            ) : (
              <p>No reviews available for this brewery</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BreweryDetail;

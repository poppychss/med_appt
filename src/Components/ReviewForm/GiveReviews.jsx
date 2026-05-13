import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./GiveReviews.css";

const GiveReviews = ({ doctor, onSave }) => {

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 5,
  });

  const [showWarning, setShowWarning] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle star click
  const handleRating = (value) => {
    setFormData({
      ...formData,
      rating: value,
    });
  };

  // Submit form
  const handleSubmit = (e, close) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.rating > 0
    ) {

      setShowWarning(false);

      // Save review
      onSave(doctor.name, formData.rating);

      // Reset form
      setFormData({
        name: "",
        review: "",
        rating: 5,
      });

      close();

    } else {
      setShowWarning(true);
    }
  };

  return (
    <Popup
      trigger={
        <button className="feedback-btn">
          Click Here
        </button>
      }
      modal
      open={showModal}
      onOpen={() => setShowModal(true)}
      onClose={() => setShowModal(false)}
    >
      {(close) => (

        <div className="review-popup-container">

          <h2>Give Feedback</h2>

          <div className="doctor-info">
            <h3>{doctor.name}</h3>
            <p>{doctor.speciality}</p>
          </div>

          {showWarning && (
            <p className="warning">
              Please fill all fields.
            </p>
          )}

          <form onSubmit={(e) => handleSubmit(e, close)}>

            {/* Name */}
            <div className="form-group">
              <label>Your Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Review */}
            <div className="form-group">
              <label>Review</label>

              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
              />
            </div>

            {/* Star Rating */}
            <div className="form-group">

              <label>Rating</label>

              <div className="star-rating">

                {[1, 2, 3, 4, 5].map((star) => (

                    <svg
                    key={star}
                    onClick={() => handleRating(star)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill={
                        star <= formData.rating
                        ? "#FFD700"
                        : "#D3D3D3"
                    }
                    className="bi bi-star-fill review-star"
                    viewBox="0 0 16 16"
                    >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696 2.183-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>

                ))}

              </div>

            </div>

            {/* Buttons */}
            <div className="popup-buttons">

              <button type="submit" className="submit-btn">
                Submit
              </button>

              <button
                type="button"
                className="close-btn"
                onClick={close}
              >
                Close
              </button>

            </div>

          </form>

        </div>
      )}
    </Popup>
  );
};

export default GiveReviews;
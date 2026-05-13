import React, { useEffect, useState } from "react";
import "./ReviewForm.css";
import GiveReviews from "./GiveReviews";

const ReviewForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [reviews, setReviews] = useState({});

  // Fetch doctors
  useEffect(() => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.log(err));
  }, []);

  // Save review rating
  const handleSaveReview = (doctorName, rating) => {
    setReviews((prev) => ({
      ...prev,
      [doctorName]: rating,
    }));
  };

  return (
    <div className="reviews-container">

      <h1 className="reviews-title">Reviews</h1>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>

              <td>{index + 1}</td>

              <td>{doctor.name}</td>

              <td>{doctor.speciality}</td>

              <td>
                <GiveReviews
                  doctor={doctor}
                  onSave={handleSaveReview}
                />
              </td>

              <td>
                {reviews[doctor.name]
                  ? `${reviews[doctor.name]} / 5`
                  : "No Review"}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;
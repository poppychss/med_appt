import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // User state
  const [username, setUsername] = useState("");

  // Doctor + appointment data
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  // Notification visibility state
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {

    // Get stored user email
    const storedUsername = sessionStorage.getItem('email');

    // Get doctor details
    const storedDoctorData = JSON.parse(
      localStorage.getItem('doctorData')
    );

    // Get appointment details
    const storedAppointmentData = storedDoctorData
      ? JSON.parse(localStorage.getItem(storedDoctorData.name))
      : null;

    // Check login
    if (storedUsername) {
      setIsLoggedIn(true);

      // Extract name before @ symbol
      const extractedName = storedUsername.split("@")[0];

      setUsername(extractedName);
    }

    // Set doctor data
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    // Set appointment data
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);

      // Show notification
      setShowNotification(true);
    }

    // Listen for appointment cancellation
    const handleStorageChange = () => {

      const updatedDoctorData = JSON.parse(
        localStorage.getItem('doctorData')
      );

      const updatedAppointmentData = updatedDoctorData
        ? JSON.parse(localStorage.getItem(updatedDoctorData.name))
        : null;

      // Hide notification if appointment removed
      if (!updatedAppointmentData) {

        setAppointmentData(null);

        setShowNotification(false);
      }
    };

    // Listen to storage updates
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };

  }, []);

  return (
    <div>

      {/* Navbar */}
      <Navbar />

      {/* Other pages/components */}
      {children}

      {/* Notification */}
      {isLoggedIn &&
        appointmentData &&
        showNotification && (

        <div className="appointment-card">

          <div className="appointment-card__content">

            {/* Close button */}
            <button
              className="close-btn"
              onClick={() => setShowNotification(false)}
            >
              ×
            </button>

            <h3 className="appointment-card__title">
              Appointment Details
            </h3>

            <p>
              <strong>Doctor:</strong> {doctorData?.name}
            </p>

            <p>
              <strong>Speciality:</strong> {doctorData?.speciality}
            </p>

            <p>
              <strong>Name:</strong> {appointmentData?.name}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {appointmentData?.appointmentDate}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {appointmentData?.selectedSlot}
            </p>

            <p className="success-message">
              Appointment Booked Successfully!
            </p>

          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };

    const slots = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
      ];
  
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const appointmentData = {
            name,
            phoneNumber,
            appointmentDate,
            selectedSlot,
            doctorName,
            doctorSpeciality,
        };

        // Save appointment in localStorage
        localStorage.setItem(
            doctorName,
            JSON.stringify(appointmentData)
        );

        // Save doctor details separately
        localStorage.setItem(
            "doctorData",
            JSON.stringify({
            name: doctorName,
            speciality: doctorSpeciality,
            })
        );

        // Send data to parent component
        onSubmit(appointmentData);

        // Reset form
        setName('');
        setPhoneNumber('');
        setAppointmentDate('');
        setSelectedSlot('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <label htmlFor="appointmentDate">Date of Appointment:</label>

            <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
            />
        </div>

        <div className="form-group">
            <label>Book Time Slot:</label>

            <select
            value={selectedSlot}
            onChange={(e) => handleSlotSelection(e.target.value)}
            required
            >
            <option value="">Select a time slot</option>

                {slots.map((slot, index) => (
                    <option key={index} value={slot}>
                        {slot}
                    </option>
                ))}
            </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm;
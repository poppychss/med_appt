import React, { useEffect, useState } from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="reports-container">

      <h1 className="reports-title">Reports</h1>

      <table className="reports-table">

        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>

              <td>{index + 1}</td>

              <td>{doctor.name}</td>

              <td>{doctor.speciality}</td>

              {/* View Report */}
              <td>
                <button className="view-btn">
                  View Report
                </button>
              </td>

              {/* Download Report */}
              <td>
                <button className="download-btn">
                  Download Report
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ReportsLayout;
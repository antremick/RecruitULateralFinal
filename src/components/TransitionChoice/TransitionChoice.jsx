import React from "react";
import { useNavigate } from "react-router-dom";
import "./TransitionChoice.css";

function TransitionChoice() {
  const navigate = useNavigate();

  const goFirmToFirm = () => {
    navigate("/firm-to-firm");
  };

  const goIndustryToIndustry = () => {
    navigate("/industry-to-industry");
  };

  return (
    <div className="transition-choice-container">
      <h1 className="page-title">
        Find People to Help Navigate Your Career Change
      </h1>
      <p className="page-subtitle">
        Are you looking to move from one firm to another, or switch industries
        altogether?
      </p>

      <div className="transition-cards">
        <div className="transition-card" onClick={goFirmToFirm}>
          <div className="card-content">
            <h2>Firm to Firm</h2>
            <p>
              Find others who have navigated a move between companies within
              consulting or banking.
            </p>
          </div>
          <button className="view-button">View &rarr;</button>
        </div>

        <div className="transition-card" onClick={goIndustryToIndustry}>
          <div className="card-content">
            <h2>Industry to Industry</h2>
            <p>
              Find others who have navigated a move across industries
            </p>
          </div>
          <button className="view-button">View &rarr;</button>
        </div>
      </div>
    </div>
  );
}

export default TransitionChoice;

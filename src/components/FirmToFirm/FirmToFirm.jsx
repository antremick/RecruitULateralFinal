import React from "react";
import { useNavigate } from "react-router-dom";

function FirmToFirm() {
  const navigate = useNavigate();

  const handleAllFirms = () => {
    navigate("/firm-to-firm/all");
  };

  const handleFirmCategories = () => {
    navigate("/firm-to-firm/categories");
  };

  const handleSelectFirms = () => {
    navigate("/firm-to-firm/select");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Firm to Firm Transition</h2>
      <p style={styles.subheading}>
        Choose how you’d like to find professionals to meet.
      </p>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={handleAllFirms}>
          Network with All Firms
        </button>
        <button style={styles.button} onClick={handleFirmCategories}>
          Network by Category of Firms
        </button>
        <button style={styles.button} onClick={handleSelectFirms}>
          Select Specific Firms
        </button>
      </div>
    </div>
  );
}

// Example inline styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "0.75rem",
  },
  subheading: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
  },
  button: {
    width: "60%",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
};

export default FirmToFirm;

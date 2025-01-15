import React, { useState } from "react";
import { categoryCompanies } from "./categoriesToCompanies"; // your mapping file

function FirmCategories({ user }) {
  // Which categories the user has selected
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  // Which categories are “expanded” to show firm names
  const [expandedCategories, setExpandedCategories] = useState({});

  // Get all category names (keys) from the mapping object
  const categories = Object.keys(categoryCompanies);

  // Toggle whether a category is selected
  const handleSelectCategory = (categoryName) => {
    setSelectedCategories((prev) => {
      // If it’s already selected, remove it
      if (prev.includes(categoryName)) {
        return prev.filter((cat) => cat !== categoryName);
      }
      // Otherwise, add it
      return [...prev, categoryName];
    });
  };

  // Toggle whether a category is expanded to show firm names
  const handleToggleMoreInfo = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName], // flip true/false
    }));
  };

    const handleContinue = async () => {
    try {
        console.log("Starting API Request")

        // Hardcoded - ASSUMES RECRUITU HAS USER INFORMATION
        const params = new URLSearchParams({ previous_company: "Goldman Sachs", school: "University of Michigan", });

      // Collect ALL companies from the selected categories.
        const allCompanies = selectedCategories.reduce((acc, categoryName) => {
        const firmsInThisCategory = categoryCompanies[categoryName] || [];
        return [...acc, ...firmsInThisCategory]; }, []);

      // For each firm in allCompanies, append it as a "current_company" param
      // e.g.  ?current_company=JP Morgan&current_company=Goldman Sachs
        allCompanies.forEach((company) => { params.append("current_company", company); });

      // For each selected category, look up its array of companies
        selectedCategories.forEach((categoryName) => {
        const companies = categoryCompanies[categoryName] || [];
        companies.forEach((company) => {
        params.append("current_company", company); }); });

        const response = await fetch(`http://127.0.0.1:5000/api/professionals?${params.toString()}`, { method: "GET" } )

        if (!response.ok) { throw new Error(`Network response was not ok: ${response.statusText}`); }

        console.log("Waiting for Professionals")
        const data = await response.json();
        setProfessionals(data);
        console.log("Fetched professionals:", data);
    } 
    catch (error) {
        console.error("Error fetching professionals:", error);
        alert("Failed to fetch professionals");
    }
    };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Firm Categories</h1>
      <p style={styles.subtitle}>
        Select any categories you’re interested in. Click “More Info” to see
        example firms in each category.
      </p>

      <div>
        {categories.map((categoryName) => {
          // Is this category currently selected?
          const isSelected = selectedCategories.includes(categoryName);
          // Is this category expanded to show firm names?
          const isExpanded = expandedCategories[categoryName] || false;

          // The array of firms for this category
          const firms = categoryCompanies[categoryName] || [];

          return (
            <div key={categoryName} style={styles.categoryCard}>
              <div style={styles.cardHeader}>
                {/* Big button to select/unselect category */}
                <button
                  style={{
                    ...styles.categoryButton,
                    backgroundColor: isSelected ? "#4a67f2" : "#fff",
                    color: isSelected ? "#fff" : "#333",
                  }}
                  onClick={() => handleSelectCategory(categoryName)}
                >
                  {isSelected ? "Selected" : "Select"}: {categoryName}
                </button>

                {/* Button to toggle the “more info” about the category */}
                <button
                  style={styles.infoButton}
                  onClick={() => handleToggleMoreInfo(categoryName)}
                >
                  {isExpanded ? "Hide Info" : "More Info"}
                </button>
              </div>

              {/* Conditionally render the list of firms if expanded */}
              {isExpanded && (
                <ul style={styles.firmList}>
                  {firms.map((firm) => (
                    <li key={firm} style={styles.firmItem}>
                      {firm}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <button onClick={handleContinue} style={styles.continueButton}>
        Continue
      </button>

      <div style={{ marginTop: "2rem" }}>
        <h3>Results:</h3>
        {professionals.map((prof) => (
          <p key={prof.id}>
            {prof.company_name} — {prof.full_name} — {prof.email} —
            <a href={prof.linkedin} target="_blank" rel="noopener noreferrer">
              {prof.linkedin}
            </a>
          </p>
        ))}
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
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#555",
  },
  categoryCard: {
    marginBottom: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "1rem",
    backgroundColor: "#fff",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
  },
  categoryButton: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    flex: 1,
    marginRight: "1rem",
    transition: "background-color 0.2s ease",
  },
  infoButton: {
    padding: "0.75rem 1rem",
    fontSize: "0.9rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
  },
  firmList: {
    listStyle: "disc",
    marginLeft: "1.5rem",
  },
  firmItem: {
    marginBottom: "0.25rem",
  },
  continueButton: {
    display: "block",
    margin: "1rem auto",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#4a67f2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 500,
  },
};

export default FirmCategories;

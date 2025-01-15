import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TransitionChoice from "./components/TransitionChoice/TransitionChoice";
import FirmToFirm from "./components/FirmToFirm/FirmToFirm";
import IndustryToIndustry from "./components/IndustryToIndustry/IndustryToIndustry";
import AllFirms from "./components/FirmToFirm/AllFirms";
import FirmCategories from "./components/FirmToFirm/FirmCategories";
import SelectFirms from "./components/FirmToFirm/SelectFirms";

function App() {
  return (
    <Router>
      {/* Simple top navbar for illustration */}
      <nav className="top-nav">
        <div className="logo">
          <Link to="/">RecruitU</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Networks</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/companies">Companies</Link>
          </li>
          <li>
            <Link to="/learn">Learn</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        {/* Main route: choose transition type */}
        <Route path="/" element={<TransitionChoice />} />
        <Route path="/firm-to-firm" element={<FirmToFirm />} />
        <Route path="/firm-to-firm/all" element={<AllFirms />} />
        <Route path="/firm-to-firm/categories" element={<FirmCategories />} />
        <Route path="/firm-to-firm/select" element={<SelectFirms />} />
        
        <Route path="/industry-to-industry" element={<IndustryToIndustry />} />
      </Routes>
    </Router>
  );
}

export default App;

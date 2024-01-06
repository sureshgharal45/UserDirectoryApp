import React from "react";
import { Link } from "react-router-dom";

const Clock = ({
  handleBackButton,
  handleSelectCountry,
  selectedCountry,
  countries,
  selectedCountryTime,
  currentTime,
  handleResumePauseClock,
  clockRun,
}) => {
  return (
    // header section (back button, country dropdown, digital timer and pause/start button)
    <div className="header">
      <div className="left-section">
        <Link to="/" onClick={handleBackButton} className="link-button">
          Back
        </Link>
      </div>
      <div className="right-section">
        <select onChange={handleSelectCountry} value={selectedCountry}>
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <div className="clock-pause-align">
          <div className="clock">
            {selectedCountry ? selectedCountryTime : currentTime}
          </div>
          <button onClick={handleResumePauseClock}>
            {clockRun ? "Pause/Start" : "Pause/Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clock;

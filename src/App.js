import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllCountries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/CountryInfo/CountryInfo";

function App() {
  return (
    <Router>
      <header className="header">
        <div className="container">
          <h5>Where in the world?</h5>
        </div>
        
      </header>
      <main className="Main">
        <div className="container">
          <Routes>
            <Route path="/" element={<AllCountries />} />
            <Route path="/country/:countryName" element={<CountryInfo />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
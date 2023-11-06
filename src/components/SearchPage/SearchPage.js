import React, { useContext, useState } from "react";
import axios from "axios";
import "./SearchPage.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../user_context.js";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("by_city");
  const [searchResults, setSearchResults] = useState([]);
  const { user, logout } = useContext(UserContext);
  const history = useNavigate();
  const handleLogout = () => {
    logout();
    history("/");
  };

  const search = async () => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/breweries?${searchType}=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="brewery-search-container">
      <h2>
        Hello{" "}
        <span style={{ textDecoration: "bold", color: "#007bff" }}>
          {user.email}
        </span>
        , welcome to Brewery Search
      </h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="by_city">By City</option>
          <option value="by_name">By Name</option>
          <option value="by_type">By Type</option>
        </select>
        <div>
          <button onClick={search} className="search-button">
            Search
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="brewery-list">
        {searchResults.map((brewery) => (
          <div key={brewery.id} className="brewery-card">
            <Link to={`/brewery/${brewery.id}`}>
              <h2>{brewery.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

import { useState } from "react";
import propertiesData from "../data/properties.json";
import "../styles/SearchPage.css";

function SearchPage() {
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [postcode, setPostcode] = useState("");
  const [year, setYear] = useState("");

  const filteredProperties = propertiesData.properties.filter((property) => {
    return (
      (type === "" || property.type === type) &&
      (minPrice === "" || property.price >= Number(minPrice)) &&
      (maxPrice === "" || property.price <= Number(maxPrice)) &&
      (minBeds === "" || property.bedrooms >= Number(minBeds)) &&
      (maxBeds === "" || property.bedrooms <= Number(maxBeds)) &&
      (postcode === "" ||
        property["postcode area"]
          .toUpperCase()
          .includes(postcode.toUpperCase())) &&
      (year === "" || property.added.year === Number(year))
    );
  });

  return (
    <div className="search-page">
      <h1>Property Search</h1>

      {/*filterations*/}
      <div className="filters">
        <div className="filter-item">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Min Price:</label>
          <input type="number" onChange={(e) => setMinPrice(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>Max Price:</label>
          <input type="number" onChange={(e) => setMaxPrice(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>Min Beds:</label>
          <input type="number" onChange={(e) => setMinBeds(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>Max Beds:</label>
          <input type="number" onChange={(e) => setMaxBeds(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>Postcode:</label>
          <input type="text" onChange={(e) => setPostcode(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>Year Added:</label>
          <input type="number" onChange={(e) => setYear(e.target.value)} />
        </div>
      </div>

      <h2>Results</h2>

      {filteredProperties.length === 0 && (
        <p>No properties found.</p>
      )}

      <div className="results-grid">
        {filteredProperties.map((property) => (
          <div key={property.id} className="result-card">

            {/* Image cards */}
            <img
              src={property.picture}
              alt={property.type}
              className="property-image"
            />

            <div className="property-details">
              <h3>{property.type}</h3>
             <strong><p className="price">
                £{property.price.toLocaleString()}
              </p></strong> 
              <p>{property.bedrooms} bedrooms</p>
              <p>{property.location}</p>
              <p>Postcode: {property["postcode area"]}</p>
              <p>
                Added: {property.added.month} {property.added.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
import { useState } from "react";
import propertiesData from "../data/properties.json";
import "../styles/SearchPage.css";

function SearchPage() {
    // 
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [postcode, setPostcode] = useState("");
  const [year, setYear] = useState("");

  const filteredProperties = propertiesData.properties.filter((property) => {
    const matchesType =
      type === "" || property.type === type;

    const matchesMinPrice =
      minPrice === "" || property.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || property.price <= Number(maxPrice);

    const matchesMinBeds =
      minBeds === "" || property.bedrooms >= Number(minBeds);

    const matchesMaxBeds =
      maxBeds === "" || property.bedrooms <= Number(maxBeds);

    const matchesPostcode =
      postcode === "" ||
      property["postcode area"]
        .toUpperCase()
        .includes(postcode.toUpperCase());

    const matchesYear =
      year === "" || property.added.year === Number(year);

    return (
        // Shows up in the browser 
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinBeds &&
      matchesMaxBeds &&
      matchesPostcode &&
      matchesYear
    );
  });

  return (
    <div className="search-page">
      <h1>Property Search</h1>

      <div className="filters">
        <div className="filter-item"> // for responsiveness
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

      {filteredProperties.map((property) => (
        <div key={property.id} className="result-card">
          <h3>{property.type}</h3>
          <p><strong>£{property.price.toLocaleString()}</strong></p>
          <p>{property.bedrooms} bedrooms</p>
          <p>{property.location}</p>
          <p>Postcode: {property["postcode area"]}</p>
          <p>Added: {property.added.month} {property.added.year}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
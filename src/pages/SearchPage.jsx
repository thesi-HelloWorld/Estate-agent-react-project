import { useState } from "react";
import propertiesData from "../data/properties.json";

function SearchPage() {
    // Setting various for filters
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Filteration
  const filteredProperties = propertiesData.properties.filter((property) => {
    return (
      (type === "" || property.type === type) &&
      (minPrice === "" || property.price >= Number(minPrice)) &&
      (maxPrice === "" || property.price <= Number(maxPrice))
    );
  });

  // Rendering
  return (
    <div>
      <h1>Property Search</h1>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Any Type</option>
        <option value="House">House</option>
        <option value="Flat">Flat</option>
        <option value="Townhouse">Townhouse</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <h2>Results</h2>

      {filteredProperties.length === 0 && (
        <p>No properties found.</p>
      )}

      {filteredProperties.map((property) => (
        <div key={property.id}>
          <h3>{property.type}</h3>
          <p>£{property.price.toLocaleString()}</p>
          <p>{property.bedrooms} bedrooms</p>
          <p>{property.location}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
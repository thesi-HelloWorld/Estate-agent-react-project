import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import FavouriteList from "../components/FavouriteList";
import "../styles/SearchPage.css";
import PropertyCard from "../components/PropertyCard";

function SearchPage() {
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [postcode, setPostcode] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (id) => {
    if (!favourites.includes(id)) {
      setFavourites([...favourites, id]);
    }
  };

  const filteredProperties = propertiesData.properties.filter((property) => {
    const addedDate = new Date(
      `${property.added.month} ${property.added.day}, ${property.added.year}`
    );

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
      (dateFrom === "" || addedDate >= new Date(dateFrom)) &&
      (dateTo === "" || addedDate <= new Date(dateTo))
    );
  });

  return (
    <div className="search-page">
        <div className="search-box">
      <h1>Property Search</h1>

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
          <label>Date From:</label>
          <input type="date" onChange={(e) => setDateFrom(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>Date To:</label>
          <input type="date" onChange={(e) => setDateTo(e.target.value)} />
        </div>
      </div>
      </div>

        <div>
          <h2>Results</h2>

          <div className="results-grid">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                addFavourite={addFavourite}
              />
            ))}
            </div>

        <FavouriteList
          favourites={favourites}
          properties={propertiesData.properties}
          setFavourites={setFavourites}
        />
      </div>
    </div>
  );
}

export default SearchPage;
import { useParams, Link } from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from "react";
import "../styles/PropertyDetails.css";
import PropertiesData from "../data/properties.json";

function PropertyDetails() {
    const {id } = useParams();

    const property = PropertiesData.properties.find(p => String (p.id) === id);
    if (!property) {
        return <div>Property not found.</div>;
    }

    const [activeTab, setActiveTab] = useState("description");
    const [mainImage, setMainImage] = useState(property.images[0]);

    return (
        <div className="property-page">
            <div className="property-container">
            <Link to="/" className="back-link">Back to search</Link>

            <h1>{property.type}</h1>
            <strong>£{property.price.toLocaleString()}</strong>
            <p>{property.location}</p>

            <div className="image-section">
        <img src={mainImage} alt="Property" className="main-image" />

        <div className="thumbnails">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              className={img === mainImage ? "active-thumb" : ""}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

        <div className="tabs">
            <button onClick={() => setActiveTab("description")}>Description</button>
            <button onClick={() => setActiveTab("floorplan")}>Floor Plan</button>
            <button onClick={() => setActiveTab("map")}>Map</button>
        </div>

        <div className="tab-content">
            {activeTab === "description" && (
            <p>{property.description}</p>
            )}

            {activeTab === "floorplan" && (
          <img src={property.floorplan} alt="Floor Plan" className="floorplan" />
            )}

            {activeTab === "map" && (
            <iframe
                title="map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
            />
            )}
        </div>
      </div>
    </div>

    );
}
export default PropertyDetails;
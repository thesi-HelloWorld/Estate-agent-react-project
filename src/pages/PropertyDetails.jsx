import { useParams, Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";


function PropertyDetails() {
    const {id } = useParams();
    const property = propertiesData.properties.find((p) => String(p.id) === id);

    const [activeTab, setActiveTab] = useState("description");
    const [mainImage, setMainImage] = useState(property ? property.images[0] : "");

    if (!property) {
        return <div>Property not found.</div>;
    }

    return (
        <div className="property-page">
            <Link to="/" className="back-link">Back to search</Link>

            <h1>{property.type}</h1>
            <p>£{property.price.toLocaleString()}</p>
            <p>{property.location}</p>

            <div className="image-section">
        <img src={mainImage} alt="Property" className="main-image" />

        <div className="thumbnails">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
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
            src={property.map}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          />
        )}
      </div>
    </div>

    );
}
export default PropertyDetails;
import { Link } from 'react-router-dom';

function PropertyCard({ property, addFavourite }) {
    return(
        <div className="result-card"
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("propertyId", property.id)
            }
          >
            <img
              src={property.picture}
              alt={property.type}
              className="property-image"
            />

              <div className="property-details">
        <h3>{property.type}</h3>

        <p className="price">
          £{property.price.toLocaleString()}
        </p>

        <p>{property.bedrooms} bedrooms</p>
        <p>{property.location}</p>

        <button onClick={() => addFavourite(property.id)}>
          <strong>Add to Favourites</strong>
        </button>

        <Link to={`/property/${property.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
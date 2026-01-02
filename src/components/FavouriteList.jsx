function FavouriteList({ favourites, properties, setFavourites }) {

  const handleDrop = (e) => {
    const id = e.dataTransfer.getData("propertyId");
    if (id && !favourites.includes(id)) {
      setFavourites([...favourites, id]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <div
      className="favourites"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2>Favourites</h2>

      {favourites.length === 0 && <p>No favourites yet.</p>}

      <ul>
        {favourites.map((id) => {
          const property = properties.find((p) => p.id === id);

          return (
            <li key={id}>
              {property.type} – £{property.price.toLocaleString()}
              <button onClick={() => removeFavourite(id)}>✕</button>
            </li>
          );
        })}
      </ul>

      {favourites.length > 0 && (
        <button onClick={clearFavourites}>
          Clear favourites
        </button>
      )}
    </div>
  );
}

export default FavouriteList;
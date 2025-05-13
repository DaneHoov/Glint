import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./SearchResults.css";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase();

  const photos = useSelector((state) => state.photos.allPhotos || []);
  const users = useSelector((state) => state.session.users || []); // assuming users are in state

  const [results, setResults] = useState({ photos: [], users: [] });

  useEffect(() => {
    if (searchQuery) {
      const photoResults = photos.filter((photo) =>
        photo.title.toLowerCase().includes(searchQuery)
      );
      const userResults = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery)
      );
      setResults({ photos: photoResults, users: userResults });
    }
  }, [searchQuery, photos, users]);

  return (
    <div className="search-results">
      <h2>Search Results for {searchQuery}</h2>

      <section>
        <h3>Photos</h3>
        <div className="photo-results">
          {results.photos.length ? (
            results.photos.map((photo) => (
              <div key={photo.id} className="photo-item">
                <img src={photo.imageUrl} alt={photo.title} />
                <p>{photo.title}</p>
              </div>
            ))
          ) : (
            <p>No photos found.</p>
          )}
        </div>
      </section>

      <section>
        <h3>Users</h3>
        <div className="user-results">
          {results.users.length ? (
            results.users.map((user) => (
              <div key={user.id} className="user-item">
                <p>{user.username}</p>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default SearchResults;

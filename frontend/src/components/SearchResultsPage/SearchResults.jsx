import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../store/userProfile";
import "./SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("query");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      fetch(`/api/users/search?username=${encodeURIComponent(username)}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then((data) => {
          dispatch(setUserProfile(data));
          navigate(`/users/${data.username}`);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [username, dispatch, navigate]);

  if (loading) {
    return (
      <div className="search-results-page">
        <h1 className="search-heading">Search Results</h1>
        <p className="search-status">Searching for “{username}”...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-page">
        <h1 className="search-heading">Search Results</h1>
        <p className="search-status error">{error}</p>
      </div>
    );
  }

  return null;
}

export default SearchResults;

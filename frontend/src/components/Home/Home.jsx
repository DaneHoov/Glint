import { Link } from "react-router-dom";
import "./Home.css";

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Glint</h1>
        <p>
          Discover, share, and enjoy beautiful photos from around the world.
        </p>
        <Link to="/signup">
          <button className="join-button">Join for Free</button>
        </Link>
      </header>
    </div>
  );
}

export default HomePage;

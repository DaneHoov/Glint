import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to PhotoShare</h1>
        <p>Discover, share, and enjoy beautiful photos from around the world.</p>
        <Link to="/signup">
          <button className="join-button">Join for Free</button>
        </Link>
      </header>

      <section className="photo-gallery">
        <div className="photo-item">
          <img
            className="photo-img"
            src="https://via.placeholder.com/600x400?text=Photo1"
            alt="Sample 1"
          />
        </div>
        <div className="photo-item">
          <img
            className="photo-img"
            src="https://via.placeholder.com/600x400?text=Photo2"
            alt="Sample 2"
          />
        </div>
        <div className="photo-item">
          <img
            className="photo-img"
            src="https://via.placeholder.com/600x400?text=Photo3"
            alt="Sample 3"
          />
        </div>
        <div className="photo-item">
          <img
            className="photo-img"
            src="https://via.placeholder.com/600x400?text=Photo4"
            alt="Sample 4"
          />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
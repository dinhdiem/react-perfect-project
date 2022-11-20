import React from "react";
import VideoHomePage from "../../assets/video-1920.mp4";

const Home = () => {
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={VideoHomePage} type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;

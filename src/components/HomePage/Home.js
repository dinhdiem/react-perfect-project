import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VideoHomePage from "../../assets/video-1920.mp4";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticate } = useSelector((state) => state.user.account);

  const handleChangeRouter = () => {
    navigate("/user");
  };

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        3
        <source src={VideoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">There's a better way to ask</div>
        <div className="title-2">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </div>
        <div className="title-3">
          {isAuthenticate === false ? (
            <button onClick={() => navigate("login")}>
              Get started - it's free
            </button>
          ) : (
            <button onClick={handleChangeRouter}>Starting Quiz</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-header">Welcome to TRACKiT</h1>
      <h2 className="home-subheader">Track your progress, achieve your goals</h2>
      <button className="home-cta">Get Started</button>
    </div>
  );
};

export default Home;

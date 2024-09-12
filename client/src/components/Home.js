import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome to TRACKiT</h1>
      <p>Manage and track your activities with ease!</p>

      {/* 'Get Started' button leads to registration page */}
      <a href="/register">
        <button>Get Started</button>
      </a>

      {/* 'Dashboard' button leads to login page if the user is not authenticated */}
      <a href="/login">
        <button>Dashboard</button>
      </a>
    </div>
  );
};

export default Home;

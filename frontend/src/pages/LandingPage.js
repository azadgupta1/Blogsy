import React from 'react';
import { Link } from 'react-router-dom';  // You'll need to install react-router-dom for navigation

function LandingPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <div>
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-2">Login</button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md m-2">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

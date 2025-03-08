import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';  // Add FeedPage
import CreatePostPage from './pages/CreatePostPage';  // Add CreatePostPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/feed" element={<FeedPage />} />  {/* Feed route */}
        <Route path="/create" element={<CreatePostPage />} />  {/* Create Post route */}
      </Routes>
    </Router>
  );
}

export default App;

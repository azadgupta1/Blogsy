import axios from 'axios';

// Base URL of your backend (change if necessary)
const API_URL = 'http://localhost:4000/api/posts';

// Create a post
export const createPost = async (title, content) => {
  const token = localStorage.getItem('token'); // Get the token from local storage
  try {
    const response = await axios.post(
      API_URL,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header for authentication
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Error creating post');
  }
};

// Get all posts
export const getAllPosts = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token for authentication
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Error fetching posts');
  }
};

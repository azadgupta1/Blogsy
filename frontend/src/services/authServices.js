// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

export const signupUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Something went wrong');
    } else {
      throw new Error('Network error');
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Something went wrong');
    } else {
      throw new Error('Network error');
    }
  }
};

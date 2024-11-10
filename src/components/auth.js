// utils/auth.js
import jwt from 'jsonwebtoken';

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token'); // Or use cookies
  }
  return null;
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  try {
    // Decode and verify the token (using your secret key)
    jwt.verify(token, 'your_secret_key');
    return true;
  } catch (error) {
    return false;
  }
}

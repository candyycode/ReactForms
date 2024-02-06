import { useState } from "react";
import PropTypes from 'prop-types';

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  async function handleClick() {
    if (!token) {
        // Handle the case where token is null
        console.error('Token is null. Cannot authenticate without a token.');
        return;
    }
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(result.message);
        setUsername(result.data.username);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="authenticate-container">
      <h2>Authenticate</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      {username && <p className="welcome-message">Welcome, {username}!</p>}
      <button className="auth-button" onClick={handleClick}>
        Authenticate Token!
      </button>
    </div>
  );
}
Authenticate.propTypes = {
    token: PropTypes.string,
};

Authenticate.defaultProps = {
    token: '',
};
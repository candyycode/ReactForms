import React, {useState} from "react";

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const isUsernameValid = (username) => username.length >= 8;

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted!");
    
        // Add your form submission logic here
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer $(token)',
              },
              body: JSON.stringify({ username, password }),
            });
      
            const result = await response.json();
            console.log(result);
      
            // Check for success property in the response
            if (result.success) {
                setToken(result.token);
                setError(null);
              } else {
                setError(result.message);
              }
            } catch (error) {
              setError(error.message);
            }
          };
  
    return  (
        <>
      <h2>Sign Up!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Username:{' '}
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={`input-field ${!isUsernameValid(username) ? 'invalid' : ''}`}
          />
        </label>
        <label>
          Password:{' '}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
        {!isUsernameValid(username) && (
          <p className="validation-message">Username must be at least 8 characters long.</p>
        )}
      </form>
    </>
  );
}
   
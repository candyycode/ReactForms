import { useState } from 'react'
import './App.css'
import Authenticate from "./components/authenticate";
import SignUpForm from "./components/signupform";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} />
    </>
  );
}


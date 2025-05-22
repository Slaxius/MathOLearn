"use client"

import { useState } from "react"
import "./App.css"
import MathLogo from "./components/MathLogo"

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt with:", { username, password })
    // Add your authentication logic here
  }

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="logo-container">
          <MathLogo />
        </div>
        <div className="welcome-content">
          <h1>Welcome!</h1>
          <div className="divider"></div>
          <p>
            Explore the beauty and logic of mathematics, where every problem has a solution waiting to be discovered!
          </p>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-container">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
          </form>

          <div className="register-prompt">
            Don't have an account? Click here to <a href="#">Register now</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./screens/login";
import CreateAccount from "./screens/createAcc";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the Login page */}
          <Route
            path="/"
            element={
              <div>
                <Login />
                <Link
                  to="/create-account"
                  className="mt-4 text-white underline block"
                >
                  Don't have an account? Create one
                </Link>
              </div>
            }
          />

          {/* Define the Create Account page */}
          <Route
            path="/create-account"
            element={
              <div>
                <CreateAccount />
                <Link
                  to="/"
                  className="mt-4 text-white underline block"
                >
                  Already have an account? Log in
                </Link>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

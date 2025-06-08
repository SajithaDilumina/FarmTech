import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value, // Update the field based on the input's name
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8070/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is OK (status 200)
      if (response.ok) {
        const result = await response.json(); 
        localStorage.setItem("token", result.token);
        console.log(result);
        setSuccessMessage("Login successful! Redirecting..."); // Set success message
        setErrorMessage(""); // Clear any previous error message

        // Redirect to the home page after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 1500);
        
      } else {
        const errorResult = await response.json();
        setErrorMessage(errorResult.message || "Login failed");
        setSuccessMessage(""); // Clear any success message
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage("An error occurred during login."); // Set error message
      setSuccessMessage(""); // Clear any success message
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b">
        <form
          onSubmit={handleSubmit}
          className="bg-[#C4DAD2] p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h3 className="text-2xl font-bold mb-6 text-green-700">Login</h3>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-[#16423C]  text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              LogIn
            </button>
          </div>

          {/* Display success message */}
          {successMessage && (
            <p className="text-green-600 font-medium text-center">
              {successMessage}
            </p>
          )}

          {/* Display error message */}
          {errorMessage && (
            <p className="text-red-600 font-medium text-center">
              {errorMessage}
            </p>
          )}

          <p className="text-sm text-center text-gray-600">
            New user?{" "}
            <a href="/signup" className="text-green-600 hover:underline">
              Register Here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;

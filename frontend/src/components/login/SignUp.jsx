import React, { useState } from "react";
import PlantNavBar from "../shared/PlantNavBar"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8070/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      setSuccessMessage("Registration successful! Redirecting to login..."); // Set success message
      setTimeout(() => {
        navigate("/login"); // Navigate to login after 2 seconds
      }, 5000);
    } catch (error) {
      console.error(error.message);
    } finally {
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <PlantNavBar />

      {/* Registration Form Container */}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b">
        <form
          onSubmit={handleSubmit}
          className="bg-[#C4DAD2] p-8 rounded-lg shadow-md w-full max-w-md my-10"
        >
          <h3 className="text-2xl font-bold mb-6 text-green-700 text-center">
            Sign Up
          </h3>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              pattern="[0-9]{10}"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <small className="text-gray-500">Format: 1234567890</small>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-[#16423C] text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </div>

          {/* Redirect to Login */}
          <p className="text-sm text-center text-gray-600">
            Already registered?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;

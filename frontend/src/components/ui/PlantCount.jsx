// src/components/PlantCount.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"; // Correct default import
import draw1 from "../../assets/draw1.png";
import draw2 from "../../assets/draw2.png";
import draw3 from "../../assets/draw3.png";
import image1 from "../../assets/image1.png";
import "flowbite"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

function PlantCount() {
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [area, setArea] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [plantDimension, setPlantDimension] = useState(null);
  const [plants, setPlants] = useState([]);
  const [plantCount, setPlantCount] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // User state variables
  const [userId, setUserId] = useState(null);

  const slides = [image1, draw1, draw2, draw3];
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Get user ID from token
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debugging: log the token

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Debugging: log the decoded token
        setUserId(decodedToken.id); // Use 'id' instead of 'userId'
        console.log("User ID set:", decodedToken.id); // Debugging
      } catch (error) {
        console.error("Token decoding error:", error); // Catch decoding errors
      }
    } else {
      console.warn("No token found in localStorage"); // Warn if no token is found
    }

    // Fetch plants from API
    axios
      .get("http://localhost:8070/plant") // Updated port
      .then((res) => {
        setPlants(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    // Auto slide change every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const calculateArea = (e) => {
    e.preventDefault();
    const widthValue = parseFloat(width);
    const lengthValue = parseFloat(length);

    console.log("Width:", widthValue, "Length:", lengthValue); // Debug log

    if (!isNaN(widthValue) && !isNaN(lengthValue)) {
      const calculatedArea = widthValue * lengthValue;
      setArea(calculatedArea);
      console.log("Calculated Area:", calculatedArea); // Debug log

      if (plantDimension) {
        const plantArea = parseFloat(plantDimension);
        if (!isNaN(plantArea) && plantArea > 0) {
          const count = Math.floor(calculatedArea / plantArea);
          setPlantCount(count);
          console.log("Plant Count:", count); // Debug log
        }
      }
    } else {
      alert("Please enter valid numbers for width and length");
    }
  };

  const handlePlantSelection = (e) => {
    const plantId = e.target.value;
    const selectedPlant = plants.find((plant) => plant._id === plantId);
    setSelectedPlant(selectedPlant);

    if (selectedPlant) {
      setPlantDimension(selectedPlant.requiredDimension);
      console.log("Selected Plant:", selectedPlant); // Debug log
    }
  };

  const saveToHistory = () => {
    console.log("Selected Plant:", selectedPlant);
    console.log("Area:", area);
    console.log("Plant Count:", plantCount);
    console.log("User ID:", userId);
    if (!selectedPlant || !area || plantCount === null || !userId) {
      alert("Please fill out all fields before saving.");
      return;
    }

    const historyData = {
      userId,
      plantName: selectedPlant.plantName,
      width,
      length,
      area,
      plantCount,
    };

    console.log("History Data to Save:", historyData);
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:8070/planthistory/add", historyData, { // Updated port
        headers: {
          Authorization: `Bearer ${token}`, // Add this line
        },
      })
      .then((res) => {
        alert("Data saved to history successfully!");
        // Optionally, reset the form
        setWidth("");
        setLength("");
        setArea(null);
        setPlantCount(null);
        setSelectedPlant(null);
        setPlantDimension(null);
      })
      .catch((err) => {
        console.error("Error saving to history:", err.message);
        alert("Error saving to history: " + err.message);
      });
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handleViewShops = () => {
    if (!selectedPlant) {
      alert("Please select a plant first.");
      return;
    }
    navigate(`/plantShopList/${encodeURIComponent(selectedPlant.plantName)}`); 
  };

  return (
    <div>
      

      <div className="flex justify-center items-center h-16">
        <div className="text-[#6A9C89] text-3xl font-bold">
          CALCULATE PLANT COUNT
        </div>
      </div>

      {/* Flex Container for Slider and Form */}
      <div className="flex flex-col md:flex-row justify-between mx-20 my-10 space-y-10 md:space-y-0 md:space-x-10">
        
        {/* Slider Section (Left) */}
        <div className="md:w-1/2">
          <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg">
            <img
              src={slides[currentSlide]}
              className="block w-full h-full object-cover"
              alt={`Slide ${currentSlide + 1}`}
            />

            {/* Previous Button */}
            <button
              type="button"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
              onClick={goToPrevSlide}
            >
              &#9664;
            </button>

            {/* Next Button */}
            <button
              type="button"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
              onClick={goToNextSlide}
            >
              &#9654;
            </button>
          </div>
        </div>

        {/* Form Section (Right) */}
        <div className="md:w-1/2">
          <form onSubmit={calculateArea} className="bg-[#EFF4F2] p-8 rounded-lg shadow-md">
            {/* Width Input */}
            <div className="mb-5">
              <label htmlFor="width" className="block mb-2 text-sm font-medium text-gray-700">
                Enter the width (m)
              </label>
              <input
                type="number" // Changed to number for validation
                step="0.01"
                id="width"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
              />
            </div>

            {/* Length Input */}
            <div className="mb-5">
              <label htmlFor="length" className="block mb-2 text-sm font-medium text-gray-700">
                Enter the length (m)
              </label>
              <input
                type="number" // Changed to number for validation
                step="0.01"
                id="length"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
                placeholder="Length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                required
              />
            </div>

            {/* Plant Selection */}
            <div className="mb-5">
              <label htmlFor="plantSelect" className="block mb-2 text-sm font-medium text-gray-700">
                Choose the plant
              </label>
              <select
                className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
                id="plantSelect"
                onChange={handlePlantSelection}
                value={selectedPlant ? selectedPlant._id : ""}
                required
              >
                <option value="">Choose...</option>
                {plants.map((plant) => (
                  <option value={plant._id} key={plant._id}>
                    {plant.plantName}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#6A9C89] text-white py-2 px-4 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none font-medium text-sm transition-colors duration-300"
            >
              Submit
            </button>
          </form>

          {/* Area Display */}
          {area && (
            <div className="mt-5 p-4 bg-[#C4DAD2] text-black rounded">
              The area of the land is: {area} square meters
            </div>
          )}

          {/* Plant Count Display */}
          {plantCount !== null && (
            <div className="mt-3 p-4 bg-blue-100 text-blue-700 rounded">
              <strong>Info:</strong> You can plant approximately {plantCount} {selectedPlant?.plantName}(s) in the given area.
            </div>
          )}

          {/* Save to History Button */}
          <button
            className="w-full bg-[#6A9C89] text-white py-2 px-4 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none font-medium text-sm transition-colors duration-300 mt-5"
            onClick={saveToHistory}
          >
            Save to History
          </button>

          {/* View Shops Button */}
          {plantCount !== null && (
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium text-sm transition-colors duration-300 mt-3"
              onClick={handleViewShops}
            >
              View Shops with {selectedPlant?.plantName}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlantCount;

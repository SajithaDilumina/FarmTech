import React, { useState } from "react";
import axios from "axios";
import AdminHeader from "../shared/AdminHeader";

function AddDimensions() {
  const [plantName, setPlantName] = useState("");
  const [requiredDimension, setRequiredDimension] = useState("");
  const [fertilizers, setFertilizers] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const fertilizersArray = fertilizers.split(",").map((f) => f.trim());

    const newPlant = {
      plantName,
      requiredDimension,
      fertilizers: fertilizersArray,
    };

    axios.post("http://localhost:8070/plant/add", newPlant)
      .then((res) => {
        setSuccessMessage("New plant dimensions added successfully.");
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage("Error creating new plant log: " + err.message);
        setSuccessMessage("");
      });
  };

  return (
    <div className="">
      <AdminHeader />
      <div className="flex justify-center items-center h-16">
        <div className="text-[#27302d] text-2xl font-bold">
          Add plant dimensions and fertilizers
        </div>
      </div>
      <div className="my-10 mx-20">
        {/* Form Start */}
        <div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-[#EFF4F2] p-8 shadow-lg rounded-lg">
            <div className="mb-5">
              <label htmlFor="plantName" className="block mb-2 text-sm font-medium text-[#27302d]">
                Enter Plant Name
              </label>
              <input
                type="text"
                id="plantName"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
                placeholder="Plant name"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="requiredDimension" className="block mb-2 text-sm font-medium text-[#27302d] ">
                Enter Required Dimension
              </label>
              <input
                type="number"
                id="requiredDimension" min="0" 
                className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
                placeholder="Dimension in meters"
                value={requiredDimension}
                onChange={(e) => setRequiredDimension(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="fertilizers" className="block mb-2 text-sm font-medium text-[#27302d]">
                Enter Fertilizers that can be used
              </label>
              <input
                type="text"
                id="fertilizers"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6A9C89]"
                placeholder="Fertilizers that can be used (comma separated)"
                value={fertilizers}
                onChange={(e) => setFertilizers(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-[#6A9C89] hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-colors duration-300"
            >
              Submit
            </button>

            {successMessage && (
              <div className="mt-5 p-4 bg-green-100 text-green-700 rounded">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mt-5 p-4 bg-red-100 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDimensions;

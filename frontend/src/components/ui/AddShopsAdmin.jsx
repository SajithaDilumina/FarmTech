// src/components/AdminAddPlantShop.jsx
import React, { useState } from "react";
import axios from "axios";
import PlantNavBar from "../shared/PlantNavBar";
import AdminHeader from "../shared/AdminHeader";

const AdminAddPlantShop = () => {
  const [shopData, setShopData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "",
    image: "",
    plants: "", // Will be a comma-separated string of plant names
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setShopData({
      ...shopData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const plantArray = shopData.plants.split(",").map((plant) => plant.trim()); // Convert comma-separated string into array

    const newShop = {
      ...shopData,
      plants: plantArray, // Add the plants array to the payload
    };

    try {
      const response = await axios.post(
        "http://localhost:8070/plantShop/add",
        newShop,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );
      setMessage("Plant shop added successfully!");
      console.log(response.data);
    } catch (error) {
      setMessage("Error adding plant shop: " + error.message);
      console.error("Error adding plant shop:", error);
    }
  };

  return (
    <div>
      <AdminHeader/>
      <div className="flex justify-center items-center h-16">
        <div className="text-[#16423C] text-3xl font-bold">
          Add New Plant Shop
        </div>
      </div>

      <div className="mx-auto w-full max-w-lg mt-5">
        <form onSubmit={handleSubmit} className="space-y-4 max-auto mx-auto bg-[#EFF4F2] p-8 shadow-lg rounded-lg">
          <div>
            <label className="block text-gray-700">Shop Name</label>
            <input
              type="text"
              name="name"
              value={shopData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter shop name"
            />
          </div>

          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={shopData.address}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter shop address"
            />
          </div>

          <div>
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={shopData.contactNumber}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={shopData.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={shopData.image}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label className="block text-gray-700">
              Plants Available (comma-separated)
            </label>
            <input
              type="text"
              name="plants"
              value={shopData.plants}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter plant names, separated by commas"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6A9C89] text-white py-2 px-4 rounded-lg hover:bg-[#5b8874] focus:outline-none"
          >
            Add Plant Shop
          </button>

          {message && <div className="text-green-600 mt-3">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default AdminAddPlantShop;

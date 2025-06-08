import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFertilizers,
  getFertilizerById,
  updateFertilizer,
  createFertilizer,
  deleteFertilizer,
} from "../services/api";
import api from "../services/api";

const AdminFertilizerPage = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [newFertilizer, setNewFertilizer] = useState({
    name: "",
    price: "",
    image: null,
    plants: "",
  });
  const history = useNavigate();

  useEffect(() => {
    fetchFertilizers();
  }, []);

  const fetchFertilizers = async () => {
    const response = await getFertilizers();
    setFertilizers(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFertilizer({ ...newFertilizer, [name]: value });
  };
  const handleFileChange = (e) => {
    setNewFertilizer({ ...newFertilizer, image: e.target.files[0] });
  };

  const handleAddFertilizer = async () => {
    try {
      await createFertilizer(newFertilizer); // Pass the entire newFertilizer object
      fetchFertilizers();
      setNewFertilizer({ name: "", price: "", image: null, plants: "" });
      history.push("/order"); // Redirect to order page
      alert("Added successfully"); // Show success message
    } catch (error) {
      console.error("Error adding fertilizer:", error);
    }
  };

  const createFertilizer = async (fertilizerData) => {
    const formData = new FormData();
    formData.append("name", fertilizerData.name);
    formData.append("price", fertilizerData.price);
    formData.append("plants", fertilizerData.plants);
    if (fertilizerData.image) {
      formData.append("image", fertilizerData.image);
    }

    try {
      const response = await api.post("/fertilizers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating fertilizer:", error);
      throw error;
    }
  };

  const handleUpdateFertilizer = (id) => {
    history.push(`/update/${id}`);
  };

  const handleDeleteFertilizer = (id) => {
    history.push(`/delete/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Fertilizers</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 p-4 bg-gray-100 rounded-lg">
          <input
            name="name"
            value={newFertilizer.name}
            onChange={handleInputChange}
            placeholder="Fertilizer Name"
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            name="price"
            value={newFertilizer.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            name="plants"
            value={newFertilizer.plants}
            onChange={handleInputChange}
            placeholder="Plants (comma-separated)"
            className="mb-2 p-2 border rounded w-full"
          />
          <button
            onClick={handleAddFertilizer}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Fertilizer
          </button>
        </div>

        {/* {fertilizers.map((fertilizer) => (
          <div key={fertilizer._id} className="border p-4 rounded-lg relative">
            <img
              src={fertilizer.image}
              alt={fertilizer.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h2 className="text-lg font-bold">{fertilizer.name}</h2>
            <p>{fertilizer.price}</p>
            <p>{fertilizer.plants.join(", ")}</p>
            <button
              onClick={() => handleUpdateFertilizer(fertilizer._id)}
              className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteFertilizer(fertilizer._id)}
              className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default AdminFertilizerPage;

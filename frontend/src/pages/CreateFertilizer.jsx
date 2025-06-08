import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateFertilizer = ({ onFertilizerAdded }) => {
  const navigate = useNavigate();

  const [newFertilizer, setNewFertilizer] = useState({
    fer_name: "",
    fer_price: "",
    fer_plants: "",
    fer_weight: "",
    fer_image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewFertilizer((prevFertilizer) => ({
      ...prevFertilizer,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    // Validate file size (2 MB)
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size must not exceed 2 MB.", {
        position: "top-right",
      });
      return; // Exit if file is too large
    }
    setNewFertilizer((prevFertilizer) => ({
      ...prevFertilizer,
      fer_image: e.target.files[0],
    }));
  };

  const submitFormFer = async (e) => {
    e.preventDefault();

    //   // Validate file size (2 MB)
    //   if (file && file.size > 2 * 1024 * 1024) {
    //     toast.error("File size must not exceed 2 MB.", {
    //       position: "top-right",
    //     });
    //     return; // Exit if file is too large
    //   }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("fer_name", newFertilizer.fer_name);
    formData.append("fer_price", newFertilizer.fer_price);
    formData.append("fer_plants", newFertilizer.fer_plants);
    formData.append("fer_weight", newFertilizer.fer_weight);
    if (newFertilizer.fer_image) {
      formData.append("fer_image", newFertilizer.fer_image);
    }

    try {
      // Make API request to add fertilizer
      const response = await axios.post(
        "http://localhost:8070/api/createFertilizer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast.success("Fertilizer added successfully!", {
        position: "top-right",
      });
      navigate("/order");
      if (onFertilizerAdded) {
        onFertilizerAdded(response.data.fertilizer); // Optional: Notify parent component
      }
    } catch (error) {
      console.error("Error adding fertilizer:", error);
      toast.error("Error adding fertilizer. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex h-full pt-10">
      <div className="m-auto">
        <h1 className="text-2xl font-bold mb-4">Admin - Manage Fertilizers</h1>

        <div className="justify-center">
          <form className="userForm" onSubmit={submitFormFer}>
            <div className="flex-auto p-4 bg-[#6A9C89] rounded-lg">
              <input
                name="fer_name"
                value={newFertilizer.fer_name}
                onChange={handleInputChange}
                placeholder="Fertilizer Name"
                className="mb-2 p-2 border rounded w-full"
                required
              />
              <input
                name="fer_price"
                value={newFertilizer.fer_price}
                onChange={handleInputChange}
                placeholder="Price"
                className="mb-2 p-2 border rounded w-full"
                type="number"
                required
              />
              <input
                name="fer_weight"
                value={newFertilizer.fer_weight}
                onChange={handleInputChange}
                placeholder="Weight in Kg"
                className="mb-2 p-2 border rounded w-full"
                type="number"
                required
              />
              <input
                type="file"
                name="fer_image"
                onChange={handleFileChange}
                className="mb-2 p-2 border rounded w-full"
                required
              />
              <input
                name="fer_plants"
                value={newFertilizer.fer_plants}
                onChange={handleInputChange}
                placeholder="Plants (comma-separated)"
                className="mb-2 p-2 border rounded w-full"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Fertilizer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFertilizer;

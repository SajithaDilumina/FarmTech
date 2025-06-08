import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateFertilizerPage = ({ onFertilizerUpdated }) => {
  const { id } = useParams();
  const [fertilizer, setFertilizer] = useState({
    fer_name: "",
    fer_price: "",
    fer_image: "",
    fer_plants: "",
    fer_weight: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/api/fertilizer/${id}`)
      .then((response) => {
        setFertilizer({
          ...response.data,
          fer_plants: response.data.fer_plants.join(", "), // Convert array to comma-separated string
        });
      })
      .catch((error) => {
        console.error("Error fetching fertilizer:", error);
      });
  }, [id]);

  // const fetchFertilizer = async () => {
  //   const response = await getFertilizerById(id);
  //   setFertilizer({
  //     ...response.data,
  //     fer_plants: response.data.plants.join(", "),
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFertilizer({ ...fertilizer, [name]: value });
  };

  const handleFileChange = (e) => {
    setFertilizer((prevFertilizer) => ({
      ...prevFertilizer,
      fer_image: e.target.files[0],
    }));
  };

  const submitFormFer = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("fer_name", fertilizer.fer_name);
    formData.append("fer_price", fertilizer.fer_price);
    formData.append("fer_weight", fertilizer.fer_weight);
    formData.append("fer_plants", fertilizer.fer_plants);
    if (fertilizer.fer_image) {
      formData.append("fer_image", fertilizer.fer_image);
    }

    try {
      // Make API request to add fertilizer
      const response = await axios.put(
        `http://localhost:8070/api/update/fertilizer/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update response:", response.data);
      setFertilizer(response.data);
      toast.success("Fertilizer Updated", {
        position: "top-right",
      });
      navigate("/order");
      if (onFertilizerUpdated) {
        onFertilizerUpdated(response.data.fertilizer); // Optional: Notify parent component
      }
    } catch (error) {
      console.error("Error updating fertilizer:", error);
      toast.error("Error updating fertilizer. Please try again.", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="flex h-full pt-10">
      <div className="m-auto">
        <h1 className="text-2xl font-bold mb-4">Update Fertilizer</h1>
        <div className="justify-center">
          <form className="userForm" onSubmit={submitFormFer}>
            <div className="flex-auto p-4 bg-[#6A9C89] rounded-lg">
              <input
                name="fer_name"
                value={fertilizer.fer_name}
                onChange={handleInputChange}
                placeholder="Fertilizer Name"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                name="fer_price"
                value={fertilizer.fer_price}
                onChange={handleInputChange}
                placeholder="Price"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                name="fer_weight"
                value={fertilizer.fer_weight}
                onChange={handleInputChange}
                placeholder="Weight in Kg"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="file"
                name="fer_image"
                onChange={handleFileChange}
                placeholder="Image"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                name="fer_plants"
                value={fertilizer.fer_plants}
                onChange={handleInputChange}
                placeholder="Plants (comma-separated)"
                className="mb-2 p-2 border rounded w-full"
              />

              <button
                type="submit"
                //onClick={handleUpdate}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => navigate("/order")}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 ml-4"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFertilizerPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminFertilizer = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFertilizers = async () => {
      try {
        const res = await axios.get("/http://localhost:8070/api/fertilizers");
        setFertilizers(res.data);
      } catch (err) {
        console.error("Error fetching fertilizers:", err);
      }
    };
    fetchFertilizers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/fertilizer/${id}`);
      setFertilizers(fertilizers.filter((fertilizer) => fertilizer._id !== id));
    } catch (err) {
      console.error("Error deleting fertilizer:", err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update/${id}`); // Redirect to update page
  };

  return (
    <div>
      <h1>Admin Fertilizer Management</h1>
      <button onClick={() => navigate("/admin/create")}>
        Create New Fertilizer
      </button>
      <div className="fertilizer-grid">
        {fertilizers.map((fertilizer) => (
          <div key={fertilizer._id} className="fertilizer-card">
            <h3>{fertilizer.fer_name}</h3>
            <p>Price: ${fertilizer.fer_price}</p>
            <p>Plants: {fertilizer.fer_plants.join(", ")}</p>
            {fertilizer.fer_image && (
              <img src={fertilizer.fer_image} alt={fertilizer.fer_name} />
            )}
            <button onClick={() => handleUpdate(fertilizer._id)}>Update</button>
            <button onClick={() => handleDelete(fertilizer._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFertilizer;

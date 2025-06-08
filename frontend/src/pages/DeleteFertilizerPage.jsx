import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFertilizer, getFertilizerById } from "../services/api";
import Swal from "sweetalert2"; // Import SweetAlert2
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DeleteFertilizerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fertilizer, setFertilizer] = useState(null);

  // Fetch fertilizer details by ID
  useEffect(() => {
    const fetchFertilizer = async () => {
      try {
        const res = await getFertilizerById(id);
        setFertilizer(res.data);
      } catch (error) {
        console.error("Error fetching fertilizer:", error);
      }
    };
    fetchFertilizer();
  }, [id]);

  const handleDelete = async () => {
    if (!fertilizer) return;

    // Use SweetAlert2 for confirmation
    MySwal.fire({
      title: `Are you sure?`,
      text: `Do you really want to delete the fertilizer: ${fertilizer.fer_name}? This process cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFertilizer(id); // Call delete API
          MySwal.fire(
            "Deleted!",
            "The fertilizer has been deleted.",
            "success"
          );
          navigate("/admin"); // Redirect after delete
        } catch (error) {
          console.error("Error deleting fertilizer:", error);
          MySwal.fire(
            "Error",
            "There was a problem deleting the fertilizer.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Fertilizer</h1>
      {fertilizer ? (
        <>
          <p>
            Are you sure you want to delete the fertilizer:{" "}
            <strong>{fertilizer.fer_name}</strong>?
          </p>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 ml-4"
          >
            Back
          </button>
        </>
      ) : (
        <p>Loading fertilizer details...</p>
      )}
    </div>
  );
};

export default DeleteFertilizerPage;

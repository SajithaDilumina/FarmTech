import { PiShoppingCartSimple } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const FertilizerCard = ({ fertilizer, handleDelete, handleAddToCart }) => {
  // Extract necessary properties
  const { fer_image, fer_name, fer_plants, fer_weight, fer_price, _id } =
    fertilizer;

  // Ensure the fer_image has the full URL
  const imageUrl = fer_image
    ? `http://localhost:8070/uploads/${fer_image}`
    : "";

  const [fertilizers, setFertilizers] = useState([]);
  //const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFertilizers = async () => {
      try {
        const res = await axios.get("http://localhost:8070/api/fertilizers");
        setFertilizers(res.data);
      } catch (error) {
        console.error("Error fetching fertilizers:", error);
      }
    };
    fetchFertilizers();
  }, []);

  // Function to confirm and handle deletion
  const confirmDelete = () => {
    // SweetAlert2 confirmation
    MySwal.fire({
      title: `Are you sure?`,
      text: `Do you really want to delete the fertilizer: ${fer_name}? This process cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(_id); // Call the delete function passed as prop
      }
    });
  };
  return (
    <div className="relative flex flex-col gap-3 pb-3 hover:shadow-lg transition-shadow duration-300">
      {/* Fertilizer Image */}
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      {/* Fertilizer Details */}
      <div>
        <p className="text-[#141811] text-base font-medium leading-normal">
          {fer_name}
        </p>
        <p className="text-black text-sm font-normal leading-normal">
          {fer_weight} Kg
        </p>
        <p className="text-[#699657] text-base font-semibold leading-normal">
          {fer_plants.length > 0 ? fer_plants.join(", ") : "No plants listed"}
        </p>
        <p className="text-[#758863] text-sm font-normal leading-normal">
          Rs. {fer_price}
        </p>
      </div>
      {/* Add to Cart Button */}
      <button
        className="absolute bottom-4 right-4 bg-[#8eb494] text-black font-bold p-2 rounded-full hover:bg-[#73a57c] transition-colors duration-300"
        onClick={() => handleAddToCart(fertilizer)}
      >
        <PiShoppingCartSimple size={24} weight="bold" />
      </button>
      {/* Update & Delete Buttons */}
      {/* {userRole === "admin" && ( */}
      <div className="flex gap-3 mt-2">
        <Link
          to={`/update/${_id}`}
          className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600"
        >
          Update
        </Link>
        <button
          onClick={confirmDelete}
          className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default FertilizerCard;

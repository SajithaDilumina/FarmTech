import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBarV";
import FertilizerGrid from "../components/FertilizerGrid";
//import ShoppingCart from "../components/ShoppingCart";
import axios from "axios";
import { toast } from "react-hot-toast";

const FertilizerOrderPage = () => {
  const [fertilizers, setFertilizers] = useState([]);
  //const [userRole, setUserRole] = useState(null); // Track user role
  const [searchInput, setSearchInput] = useState("");
  const [cartItems, setCartItems] = useState([]); // State for the shopping cart

  const handleSearchChange = (newSearchTerm) => {
    setSearchInput(newSearchTerm);
  };

  const handleAddToCart = (fertilizer) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item._id === fertilizer._id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === fertilizer._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...fertilizer, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (fertilizerId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== fertilizerId)
    );
  };

  const handleUpdateQuantity = (fertilizerId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === fertilizerId
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const totalCost = cartItems.reduce(
    (total, item) => total + item.fer_price * item.quantity,
    0
  );

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
    // Fetch user role from backend (this can be a session or token)
    // axios
    //   .get("http://localhost:5000/api/user-role", { withCredentials: true })
    //   .then((response) => {
    //     setUserRole(response.data.role); // e.g., "admin" or "customer"
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching user role:", error);
    //   });
  }, []);

  // Filter based on searchInput
  const filteredData = fertilizers.filter((item) => {
    // Search across fields you deem relevant
    return (
      item.fer_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      (Array.isArray(item.fer_plants) &&
        item.fer_plants
          .join(", ")
          .toLowerCase()
          .includes(searchInput.toLowerCase())) // Search by plants
    );
  });

  // Function to delete fertilizer by id
  const handleDeleteFertilizer = async (fertilizerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8070/api/delete/fertilizer/${fertilizerId}`
      );
      if (response.status === 200) {
        setFertilizers((prevFertilizers) =>
          prevFertilizers.filter(
            (fertilizer) => fertilizer._id !== fertilizerId
          )
        );
        toast.success("Fertilizer deleted successfully!");
      } else {
        toast.error("Failed to delete fertilizer.");
      }
    } catch (error) {
      console.error("Error deleting fertilizer:", error);
      toast.error("Failed to delete fertilizer.");
    }
  };

  return (
    <div>
      <Header
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        totalCost={totalCost}
      />
      <div className="flex justify-between">
        <div className="flex-grow">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
        <div className="flex justify-end items-center mr-8">
          {/* {userRole === "admin" && ( */}
          <Link
            to="/add-fer"
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 object-right-top absolute"
          >
            Create Fertilizer
          </Link>
          {/* )} */}
        </div>
      </div>
      {filteredData.length > 0 ? (
        <FertilizerGrid
          //fertilizers={fertilizers}
          //userRole={userRole} // Pass the user role here
          key={fertilizers._id}
          fertilizers={filteredData}
          deleteFertilizer={handleDeleteFertilizer} // Pass delete handler if needed in the grid
          handleAddToCart={handleAddToCart} // Pass cart handler
        />
      ) : (
        <div className="text-center text-gray-800 mt-10">
          No fertilizer found matching "{searchInput}"
        </div>
      )}
    </div>
  );
};

export default FertilizerOrderPage;

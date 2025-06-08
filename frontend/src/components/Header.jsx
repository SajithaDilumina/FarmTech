import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PiShoppingCartSimple,
  PiMinus,
  PiPlus,
  PiTrash,
  PiX,
} from "react-icons/pi";
import { PiUser } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";

// Header component
const Header = ({ cartItems, onRemove, totalCost, onUpdateQuantity }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRentDropdownOpen, setIsRentDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleRentDropdown = () => {
    setIsRentDropdownOpen(!isRentDropdownOpen);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Generate a random order number
    const orderNo = Math.floor(Math.random() * 1000000);

    // Title of the PDF
    doc.setFontSize(22);
    doc.text("Invoice", 10, 10);

    // Add order number to the top right corner
    doc.setFontSize(12);
    doc.text(`Order No: ${orderNo}`, 150, 10);

    // Start the y position for the first item
    let yPosition = 30;

    for (const item of cartItems) {
      // Add fertilizer image
      // if (item.fer_image) {
      //   try {
      //     const imgData = await getImageAsBase64(item.fer_image); // Load image as base64
      //     doc.addImage(imgData, "JPEG", 10, yPosition, 30, 30); // Adjust size as needed
      //   } catch (error) {
      //     console.error("Error loading image:", error);
      //     continue; // Skip this item if there's an error loading the image
      //   }
      // }

      // Add fertilizer details
      doc.setFontSize(16);
      doc.text(`Fertilizer: ${item.fer_name}`, 10, yPosition); // Fertilizer name
      // Check if fer_plants is defined and is an array before joining
      const plantsText = Array.isArray(item.fer_plants)
        ? item.fer_plants.join(", ")
        : "N/A";
      doc.text(`Plants: ${plantsText}`, 10, yPosition + 10); // Plants associated with fertilizer
      doc.text(`Quantity: ${item.quantity}`, 10, yPosition + 20); // Quantity
      doc.text(`Weight: ${item.fer_weight}`, 10, yPosition + 30); // Weight
      doc.text(`Price: Rs. ${item.fer_price}`, 10, yPosition + 40); // Price

      // Adjust position for the next item
      yPosition += 50;
    }

    // Add total cost at the bottom
    doc.setFontSize(16);
    doc.text(`Total: Rs. ${totalCost}`, 10, yPosition + 20);

    // Save the PDF
    doc.save(`invoice_${orderNo}.pdf`);
  };

  // Helper function to fetch image as base64
  // const getImageAsBase64 = (url) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.crossOrigin = "Anonymous"; // Allow cross-origin access
  //     img.src = url;
  //     img.onload = () => {
  //       const canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       const ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);
  //       const dataURL = canvas.toDataURL("image/jpeg");
  //       resolve(dataURL);
  //     };
  //     img.onerror = (error) => reject(error);
  //   });
  // };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f2f4f0] px-10 py-3 bg-[#16423C]">
      <div className="flex items-center gap-4 text-[#ffffff]">
        <div className="size-4 mb-3">
          <FontAwesomeIcon icon={faSeedling} size="2x" />
        </div>
        <h2 className="text-[#ffffff] text-lg font-bold leading-tight tracking-[-0.015em] px-5">
          <Link to="/" className="text-[#ffffff]">
            Farm Tech
          </Link>
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-9">
          {/* Rent Equipment with Dropdown */}
          <div className="relative">
            <button
              className="text-[#ffffff] text-sm font-medium leading-normal"
              onClick={toggleRentDropdown}
            >
              Tool Renting
            </button>
            {isRentDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to="/rent"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => setIsRentDropdownOpen(false)}
                >
                  Rent Tools
                </Link>
                <Link
                  to="/booking"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => setIsRentDropdownOpen(false)}
                >
                  My Rentals
                </Link>
              </div>
            )}
          </div>
          <Link
            className="text-[#ffffff] text-sm font-medium leading-normal"
            to="/order"
          >
            Fertilizer
          </Link>

          <a
            className="text-[#ffffff] text-sm font-medium leading-normal"
            href="#"
          >
            Crop
          </a>
          <Link
            className="text-[#ffffff] text-sm font-medium leading-normal"
            to="/PlantCount"
          >
            Land Optimization
          </Link>
        </nav>
        <div className="flex gap-2">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f2f4f0] text-[#141811] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <PiUser size={24} weight="bold" />
          </button>
          <button
            className="flex items-center justify-center bg-[#f2f4f0] text-[#141811] h-10 rounded-xl px-2.5"
            onClick={toggleDropdown}
          >
            <PiShoppingCartSimple size={24} weight="bold" />
            {cartItems.length > 0 && (
              <span className="ml-2 bg-red-600 text-white rounded-full px-2 text-xs">
                {cartItems.length}
              </span>
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border shadow-lg p-4 rounded-md w-72 z-10">
              <div className="flex justify-between items-center mb-3">
                <strong>Your Cart</strong>
                <button onClick={toggleDropdown}>
                  <PiX size={20} />
                </button>
              </div>
              <ul className="space-y-3">
                {cartItems.length === 0 ? (
                  <li className="text-center">Your cart is empty</li>
                ) : (
                  cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p>{item.fer_name}</p>
                        <p>{item.fer_weight} Kg</p>
                        <p>
                          Rs. {item.fer_price} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1"
                          onClick={() => onUpdateQuantity(item._id, -1)}
                        >
                          <PiMinus />
                        </button>
                        <button
                          className="p-1"
                          onClick={() => onUpdateQuantity(item._id, 1)}
                        >
                          <PiPlus />
                        </button>
                        <button
                          className="p-1 text-red-500"
                          onClick={() => onRemove(item._id)}
                        >
                          <PiTrash />
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              {cartItems.length > 0 && (
                <>
                  {/* Display total cost */}
                  <div className="mt-4 border-t pt-2">
                    <strong>Total: Rs. {totalCost}</strong>
                  </div>
                  {/* Generate Bill button */}
                  <button
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full"
                    onClick={generatePDF}
                  >
                    Generate Bill
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

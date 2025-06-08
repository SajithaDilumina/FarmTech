import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "../css/yeildCss.css";
import "../css/main.css";
import AdminHeader from "./shared/AdminHeader";

// Modal component to display image popup
const ImageModal = ({ isModalOpen, selectedImage, closeModal }) => {
  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-4 rounded-lg relative"
        onClick={(e) => {
          // Prevents the modal from closing when clicking inside the content
          e.stopPropagation();
        }}
      >
        <img
          src={selectedImage}
          alt="yield"
          className="w-full h-auto object-cover rounded"
        />
        <button
          className="absolute top-2 right-2 text-black text-2xl"
          onClick={closeModal}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const AllBuyerCards = () => {
  const [yeilds, setYeilds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const ComponentsRef = useRef();

  // Fetch products from the API
  useEffect(() => {
    const fetchBuyerCards = async () => {
      try {
        const res = await axios.get("http://localhost:8070/yeildCard/");
        setYeilds(res.data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchBuyerCards();
  }, []);

  // Handle product deletion
  const handleDelete = async (buyer_card_ID) => {
    try {
      await axios.delete(
        `http://localhost:8070/yeildCard/delete/${buyer_card_ID}`
      );
      setYeilds(yeilds.filter((yeild) => yeild._id !== buyer_card_ID));
      alert("yield deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting yield");
    }
  };

  // Handle product search
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredYeilds = yeilds.filter(
      (yeild) =>
        yeild.b_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        yeild.b_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        yeild.buyer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setYeilds(filteredYeilds);
    setNoResult(filteredYeilds.length === 0);
  };

  // Open modal to display image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <>
    <AdminHeader/>
      <div ref={ComponentsRef} className="yeild-AllCard mx-auto p-4">
        <div className="pti-text-dark pti-text-h1 text-center pti-bolder">
          Buyer's Crop Dashboard
        </div>
        <div className="yeild-AllCard-search-box">
          <div className="yeild-AllCard-search-box2">
            <form className="flex" onSubmit={handleSearch}>
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                className="yeild-AllCard-search-input border border-gray-300 p-3 rounded-l-md focus:outline-none focus:ring-2"
                type="search"
                placeholder="Search . . ."
                aria-label="Search"
              />
              <button
                className="yeild-AllCard-search-btn pti-bg-dark-green pti-text-light pti-bold text-white p-2 rounded-r-md"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div className="yeild-AllCard-btn-box ">
            <button className="yeild-AllCard-add-btn pti-bolder">
              <Link to="/yeildCard/add" className="yeild-AllCard-add-link">
                Add Yeilds
              </Link>
            </button>
            <button className="yeild-AllCard-add-btn2 pti-bolder">
              <Link to="/yeildCard/allBuyerBuying" className="yeild-AllCard-add-link">
                View Buying Details
              </Link>
            </button>
          </div>
        </div>
        <div className="yeild-AllCard-section2-box grid grid-cols-1 md:grid-cols-2">
          {noResult ? (
            <div className="col-span-full text-center text-red-500">
              No products found
            </div>
          ) : (
            yeilds.map((yeild) => (
              <div
                key={yeild._id}
                className="card bg-red-500 border border-gray-300 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={yeild.image}
                  alt="Product"
                  className="yeild-AllCard-section2-img h-48 object-cover cursor-pointer"
                  onClick={() => openModal(yeild.image)}
                />
                <div className="p-4">
                  <div className="yeild-AllCard-section2-title-box">
                    <div className="pti-text-h2 pti-bolder ">
                      {yeild.b_title}
                    </div>
                    <div className="yeild-AllCard-section2-id text-s">
                      {yeild.buyer_card_ID}
                    </div>
                  </div>
                  <div className="yeild-AllCard-section2-para mb-2">
                    {yeild.b_description}
                  </div>
                  <div className="yeild-AllCard-section2-rate-box">
                    <div className="yeild-AllCard-section2-rate">
                      Rate: {yeild.buying_rate}
                    </div>
                    <div className="yeild-AllCard-section2-rate">
                      Qty: {yeild.buying_quantity}
                    </div>
                  </div>
                  <div className="yeild-AllCard-section2-bottom-box">
                    <div className="yeild-AllCard-section2-bottom-buyer">
                      <div className=" mb-2 pti-text-h3 pti-bold">
                        Buyer Email: {yeild.buyer_id}
                      </div>
                      <div className="  mb-4 pti-text-h3 pti-bold">
                        Buyer Name: {yeild.buyer_name}
                      </div>
                    </div>
                    <div className="yeild-AllCard-section2-bottom-icon-box flex justify-between items-center">
                      <Link to={`/yeildCard/${yeild._id}`}>
                        <button className="yeild-AllCard-section2-bottom-icon pti-bg-darker-green yeild-AllCard-section2-bottom-icon1 bg-blue-500 text-white px-4 py-2 rounded-md">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button
                        className="yeild-AllCard-section2-bottom-icon pti-bg-darker-green yeild-AllCard-section2-bottom-icon2 bg-red-700 text-white px-4 py-2 rounded-md"
                        onClick={() => handleDelete(yeild._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Include ImageModal component */}
        <ImageModal
          isModalOpen={isModalOpen}
          selectedImage={selectedImage}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default AllBuyerCards;

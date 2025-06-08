// src/components/AllPlantShops.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all plant shops from the backend
  const fetchAllPlantShops = async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8070/plantShop', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });
      console.log('API Response:', response.data); // Debugging: log the response
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching plant shops:', error);
      alert('Error fetching plant shops: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlantShops(); // Fetch all shops on component mount
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center h-16">
          <div className="text-[#6A9C89] text-3xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center h-16">
        <div className="text-[#6A9C89] text-3xl font-bold">All Plant Shops</div>
      </div>

      <div className="mx-20 mt-5 mb-10">
        {shops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shops.map((shop) => (
              <div key={shop._id} className="border rounded-lg p-4 shadow-md bg-[#EFF4F2]">
                <div className="flex">
                  {/* Image on the left, increased size */}
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-2/5 h-auto object-cover rounded-t-lg"
                  />
                  {/* Details on the right */}
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-bold mt-2">{shop.name}</h3>
                    <p>
                      <strong>Address:</strong> {shop.address}
                    </p>
                    <p>
                      <strong>Contact Number:</strong> {shop.contactNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {shop.email}
                    </p>
                    <p className="mt-2">
                      <strong>Plants Available:</strong>
                    </p>
                    {/* Removed bullets from plant details */}
                    <div className="ml-2">
                      {shop.plants.map((plant, index) => (
                        <p key={index} className="text-gray-600">
                          {plant}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No plant shops found.</p>
        )}
      </div>
    </div>
  );
};

export default AllShops;

// src/components/PlantShopList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PlantNavBar from '../shared/PlantNavBar';

const PlantShopList = () => {
  const { plantName } = useParams(); // Extract plantName from URL
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlantShops = async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debugging: log the token
    console.log('Plant Name:', plantName); // Debugging: log the plant name

    if (!plantName) {
      console.error('No plant name provided');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8070/plantShop/plant/${plantName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
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
    fetchPlantShops();
  }, [plantName]);

  if (loading) {
    return (
      <div>
        <PlantNavBar />
        <div className="flex justify-center items-center h-16">
          <div className="text-[#6A9C89] text-3xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
     
      <div className="flex justify-center items-center h-16 ">
        <div className="text-[#6A9C89] text-3xl font-bold">
          Shops Selling {plantName}
        </div>
      </div>

      <div className="mx-20 mt-5">
        {shops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {shops.map((shop) => (
              <div
                key={shop._id}
                className="flex flex-col md:flex-row border rounded-lg p-4 shadow-md bg-[#EDF4F2]" // Light green background
              >
                {/* Image on the left */}
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-48 md:w-48 object-cover rounded-lg md:mr-4 mb-4 md:mb-0"
                />

                {/* Shop details on the right */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{shop.name}</h3>
                    <p>
                      <strong>Address:</strong> {shop.address}
                    </p>
                    <p>
                      <strong>Contact Number:</strong> {shop.contactNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {shop.email}
                    </p>
                  </div>
                  <div className="mt-2">
                    <strong>Plants Available:</strong>
                    <ul className="mt-1 space-y-1"> {/* Removed bullets, added spacing */}
                      {shop.plants.map((plant, index) => (
                        <li key={index} className="text-gray-600">
                          {plant}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No shops found for {plantName}.</p>
        )}
      </div>
    </div>
  );
};

export default PlantShopList;
  
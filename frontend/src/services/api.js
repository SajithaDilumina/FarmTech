import axios from 'axios';

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: 'http://localhost:8070/api', // Adjust to your backend URL
});

// Function to handle getting all fertilizers
export const getFertilizers = () => api.get('/fertilizers');

// Function to handle getting a single fertilizer by ID
export const getFertilizerById = (id) => api.get(`/${id}`);

// Function to handle creating a new fertilizer with image upload support
export const createFertilizer = async (fertilizerData) => {
  const formData = new FormData();
  formData.append('name', fertilizerData.name);
  formData.append('price', fertilizerData.price);
  formData.append('weight', fertilizerData.weight);
  formData.append('plants', fertilizerData.plants);
  if (fertilizerData.image) {
    formData.append('image', fertilizerData.image); // Handle image file
  }

  try {
    const response = await api.post('/fertilizers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating fertilizer:', error);
    throw error;
  }
};

// Function to handle updating a fertilizer by ID
export const updateFertilizer = (id, fertilizerData) => {
  const formData = new FormData();
  formData.append('name', fertilizerData.name);
  formData.append('price', fertilizerData.price);
  formData.append('weight', fertilizerData.weight);
  formData.append('plants', fertilizerData.plants);
  if (fertilizerData.image) {
    formData.append('image', fertilizerData.image); // Handle image file
  }

  return api.put(`/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Function to handle deleting a fertilizer by ID
//export const deleteFertilizer = (id) => api.delete(`/${id}`);

export const deleteFertilizer = (id) => {
  return axios.delete(`http://localhost:8070/api/delete/fertilizer/${id}`);
};
export default api;

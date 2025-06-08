import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function UpdateProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [yeild, setYeild] = useState({
    buyer_card_ID: "",
    image: "",
    b_title: "",
    b_description: "",
    buyer_id: "",
    buyer_name: "",
    buying_rate: "",
    buying_quantity: "",
  });
  const [img, setImg] = useState(null);

  const imageBase64 = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  useEffect(() => {
    // Fetch product data by ID
    const fetchProductData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8070/yeildCard/get/${id}`
        );
        setYeild(response.data.yeild);
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("An error occurred while fetching product data");
      }
    };
    fetchProductData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setYeild({
      ...yeild,
      [name]: value,
    });
  };

  // Handle image change with size validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { // Check if file size exceeds 2 MB
      alert("Image size should be less than 2 MB");
    } else {
      setImg(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert image file to base64 if a new file is selected
      if (img) {
        yeild.image = await imageBase64(img);
      }
      await Axios.put(`http://localhost:8070/yeildCard/update/${id}`, yeild);
      alert("Product updated successfully");
      navigate("/yeildCard/");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <div className="yeild-addCard-form-section container">
      <div className="text-center pti-text-h1 pti-text-dark pti-bolder">
        Update Crop Post
      </div>
      <form onSubmit={handleSubmit}>
        <div className="yeild-addCard-form-box">
          <div>
            <div>
              <div className="yeild-addCard-form-label">Card ID</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  name="buyer_card_ID"
                  value={yeild.buyer_card_ID}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Image</div>
              <div>
                <label htmlFor="uploadImage">
                  <div className="uploadBox">
                    <input
                      type="file"
                      className="add-product-upload add-product-input"
                      onChange={handleImageChange}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Title</div>
              <div>
                <input
                  type="text"
                  name="b_title"
                  className="add-product-input form-control"
                  value={yeild.b_title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Description</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  name="b_description"
                  value={yeild.b_description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">
                Buying Quantity (Kg)
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  className="add-product-input form-control"
                  name="buying_quantity"
                  value={yeild.buying_quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">
                Buying Rate (per kilo)
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="add-product-input form-control"
                  name="buying_rate"
                  value={yeild.buying_rate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Buyer Email</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  name="buyer_id"
                  value={yeild.buyer_id}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Buyer Name</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  name="buyer_name"
                  value={yeild.buyer_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="yeild-addCard-form-btn pti-bolder pti-text-h3"
              >
                update
              </button>
            </div>
          </div>
          <div>
            <div className="yeild-updateCard-form-img"></div>
          </div>
        </div>
      </form>

      <br />
    </div>
  );
}

export default UpdateProducts;

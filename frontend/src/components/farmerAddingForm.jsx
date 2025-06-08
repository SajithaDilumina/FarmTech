import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    buying_quantity: 0, // Ensure this starts as a number
  });
  const [sellingQuantity, setSellingQuantity] = useState(0);
  const [farmerId, setFarmerId] = useState("");
  const [farmerName, setFarmerName] = useState("");



  useEffect(() => {
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
  const auth = 'samanperera@gmail.com';
  const secret = 'Saman Perera';
  useEffect(() => {
    setFarmerId(auth);
  }, [auth]);
  
  useEffect(() => {
    setFarmerName(secret);
  }, [secret]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure buying_quantity remains a number
    setYeild((prev) => ({
      ...prev,
      [name]: name === "buying_quantity" ? Number(value) || 0 : value, // Convert to number
    }));
  };

  const handleSellingQuantityChange = (e) => {
    const value = Number(e.target.value);
    setSellingQuantity(value || 0); // Convert to number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(yeild.buying_quantity) || isNaN(sellingQuantity)) {
      alert("Please ensure all quantities are valid numbers.");
      return; // Prevent submission if values are invalid
    }
    try {
      await Axios.put(`http://localhost:8070/yeildCard/farmer/update/${id}`, {
        selling_quantity: sellingQuantity,
      });

      await Axios.post("http://localhost:8070/yeildCard/farmer/add", {
        buyer_card_ID: yeild.buyer_card_ID,
        b_title: yeild.b_title,
        b_description: yeild.b_description,
        buyer_id: yeild.buyer_id,
        buyer_name: yeild.buyer_name,
        buying_rate: yeild.buying_rate,
        selling_quantity: sellingQuantity, // Send the buying quantity as well
        farmer_id: farmerId,
        farmer_name: farmerName,
      });

      alert("Product updated and added successfully");
      navigate("/yeildCard/FarmersView");
    } catch (error) {
      console.error("Error updating or adding product:", error);
      alert("Error updating or adding product");
    }
  };

  return (
    <div className="yeild-addCard-form-section container">
      <div className="text-center pti-text-h1 pti-text-dark pti-bolder">
        Sell Your Crops
      </div>
      <form onSubmit={handleSubmit}>
        <div className="yeild-addCard-form-box2">
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
              <div className="yeild-addCard-form-label">Title</div>
              <div>
                <input
                  type="text"
                  name="b_title"
                  className="add-product-input form-control"
                  value={yeild.b_title}
                  onChange={handleInputChange}
                  readOnly
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

                  readOnly
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Buying Quantity (Kg)</div>
              <div>
                <input
                  type="number"
                  min="0"
                  className="add-product-input form-control"
                  name="buying_quantity"
                  value={yeild.buying_quantity}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Buying Rate (per kilo)</div>
              <div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="add-product-input form-control"
                  name="buying_rate"
                  value={yeild.buying_rate}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Buyer ID</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  name="buyer_id"
                  value={yeild.buyer_id}
                  onChange={handleInputChange}
                  readOnly
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
                  readOnly
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Selling Quantity</div>
              <div>
                <input
                  type="number"
                  min="0"
                  className="add-product-input form-control"
                  value={sellingQuantity}
                  onChange={handleSellingQuantityChange}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Farmer ID</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  value={farmerId}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Farmer Name</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  value={farmerName}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="yeild-addCard-form-btn pti-bolder pti-text-h3"
              >
                Update Crops
              </button>
            </div>
          </div>
          <div>
            <div className="yeild-updateCard-form-img2"></div>
          </div>
        </div>
      </form>

      <br />
    </div>
  );
}

export default UpdateProducts;

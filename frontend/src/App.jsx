import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import "flowbite";
import AppNavbar from "./components/shared/PlantNavBar";
import PlantCount from "./components/ui/PlantCount";
import AddDimentions from "./components/ui/AddDimentions";
import HistoryPlantCount from "./components/ui/HistoryPlantCount";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import PlantShopList from "./components/ui/PlantShopList";
import AdminAddPlantShop from "./components/ui/AddShopsAdmin";

// sajitha
import Rent_home from "./pages/Rent_home";
import Index_page from "./pages/Tool_home";
import Tool_view from "./pages/Tool_view";
import ToolForm from "./pages/Rent_create";
import Tool_bookings from "./pages/Tool_bookings";
import Tool_booking from "./pages/Tool_booking";
import Rent_bookings from "./pages/Rent_bookings";
import AllShops from "./components/ui/AllShops";

// vihara
import FertilizerOrderPage from "./pages/FertilizerOrderPage";
import DeleteFertilizerPage from "./pages/DeleteFertilizerPage";
import AdminFertilizerPage from "./pages/AdminFertilizerPage";
import UpdateFertilizerPage from "./pages/UpdateFertilizerPage";
import AdminFertilizer from "./pages/AdminFertilizer";
import CreateFertilizer from "./pages/CreateFertilizer";

// daham
import BuyerCardAdd from "./components/buyerCardAdd";
import AllBuyerCards from "./components/allBuyerCards";
import UpdatebuyerCard from "./components/updatebuyerCard";
import AllBuyerBuying from "./components/allBuyerBuying";

// import Navbar from "./components/Navbar";
import Home from "./components/home";
import Footer from "./components/footer";

import FarmersView from "./components/farmersView";
import FarmerAddingForm from "./components/farmerAddingForm";
import AllFarmerSelling from "./components/allFarmerSelling";

function MainApp() {
  const location = useLocation();
  return (
    <>
      {/* Conditionally render AppNavbar, hide it on the /order route */}
      {location.pathname !== "/order" && <AppNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/PlantCount" element={<PlantCount />} />
        <Route path="/HistoryPlantCount" element={<HistoryPlantCount />} />
        <Route path="/admin/addDimentions" element={<AddDimentions />} />
        <Route path="/admin/addShopsAdmin" element={<AdminAddPlantShop />} />
        <Route path="/plantShopList/:plantName" element={<PlantShopList />} />
        <Route path="/AllShops" element={<AllShops />} />

        {/* //Sajitha */}
        <Route path="/rent" element={<Index_page />} />
        <Route path="/rent_admin_home" element={<Rent_home />} />
        <Route path="/rent_create" element={<ToolForm />} />
        <Route path="/tools/:id" element={<ToolForm />} />
        <Route path="/tools_home/:id" element={<Tool_view />} />
        <Route path="/booking" element={<Tool_bookings />} />
        <Route path="/booking/:id" element={<Tool_booking />} />
        <Route path="/tools/:toolId/bookings" element={<Rent_bookings />} />

        {/* //Vihara */}
        <Route path="/order" element={<FertilizerOrderPage />} />
        <Route path="/adminfertilizer" element={<AdminFertilizer />} />
        <Route path="/delete/:id" element={<DeleteFertilizerPage />} />
        <Route path="/adminfer" element={<AdminFertilizerPage />} />
        <Route path="/update/:id" element={<UpdateFertilizerPage />} />
        <Route path="/add-fer" element={<CreateFertilizer />} />

        {/* daham */}
        <Route path="/yeildCard/add" exact element={<BuyerCardAdd />} />
        <Route path="/yeildCard/" exact element={<AllBuyerCards />} />
        <Route path="/yeildCard/:id" exact element={<UpdatebuyerCard />} />
        <Route
          path="/yeildCard/allBuyerBuying"
          exact
          element={<AllBuyerBuying />}
        />
        <Route path="/yeildCard/FarmersView" exact element={<FarmersView />} />
        <Route
          path="/yeildCard/FarmersView/:id"
          exact
          element={<FarmerAddingForm />}
        />
        <Route
          path="/yeildCard/allFarmerSelling"
          exact
          element={<AllFarmerSelling />}
        />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect } from "react";
import "../css/home.css";

const Footer = () => {

  return (
    <div className="footer">
      <div className="flex flex-row justify-around pb-3 pt-5">
        <div>
          <div className="footer-head">Contacts</div>
          <div className="footer-para">24th road, malabe</div>
          <div className="footer-para">+94 765887659</div>
          <div className="footer-para">farmtechsupport@gmail.com</div>
          <div className="footer-para">www.farmtech.com</div>
          <div className="flex flex-row gap-3 pt-2">
            <div><i class="fa-brands fa-facebook-f"></i></div>
            <div><i class="fa-brands fa-instagram"></i></div>
            <div><i class="fa-brands fa-twitter"></i></div>
            <div><i class="fa-brands fa-linkedin"></i></div>
          </div>
        </div>
        <div>
          <div className="footer-head">Information</div>
          <div className="footer-para">Fertilizers</div>
          <div className="footer-para">Tools</div>
          <div className="footer-para">Buying</div>
          <div className="footer-para">Selling</div>
        </div>
        <div>
          <div className="footer-head">Our Values</div>
          <div className="footer-para">My account</div>
          <div className="footer-para">Discounts</div>
          <div className="footer-para">Coupens</div>
          <div className="footer-para">Orders</div>
        </div>
      </div>
      <hr className="pt-3" />
      <div className="text-center footer-bottom pt-2">@copyright 2024 powered by farmtech</div>
    </div>
  );
};

export default Footer;

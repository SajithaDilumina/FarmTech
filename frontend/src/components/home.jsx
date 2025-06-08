import React, { useEffect } from "react";
import "../css/home.css";
import FarmersView from "../components/farmersView";
const Home = () => {

  return (
    <div>
      <section className="hp-s1 flex flex-col items-center">
        <div className=" flex flex-row justify-center items-center">
          <div className="hp-s1-heading text-center">
            Empowering Farmers{" "}
            <span className="hp-s1-header-2">
              {" "}
              Innovative Technology for a Thriving Future
            </span>{" "}
          </div>
        </div>
        <div className="pt-3">
          <button className="hp-s1-btn">Learn more</button>
        </div>
      </section>
      <section className="hp-s2">
        <div className="flex flex-row justify-around items-center">
          <div className="hp-s2-content  pt-5">
            <div className="pti-text-h2 pti-bolder pb-3">
              AGRICULTURAL MARKET
            </div>
            <div>
              Welcome to the Agricultural Market, your one-stop destination for
              connecting farmers with buyers. Our platform revolutionizes the
              agricultural landscape by facilitating direct trade, eliminating
              middlemen, and ensuring that farmers receive fair prices for their
              hard work. With a user-friendly interface, farmers can easily
              showcase their produce, from fresh fruits and vegetables to grains
              and livestock, while buyers can effortlessly browse listings,
              compare prices, and purchase high-quality products. We believe in
              fostering a sustainable agricultural community, promoting
              transparency and trust in every transaction. Join us in
              transforming the way we approach farming and food
              distribution—empowering farmers, supporting local economies, and
              making fresh produce accessible to all.
            </div>
          </div>
          <div className="flex flex-row">
            <div className="hp-s2-img1"></div>
            <div className="hp-s2-img2"></div>
          </div>
        </div>
      </section>
      <section className="hp-s3 flex flex-row justify-around items-center">
        <div className="flex flex-row gap-5">
          <div>
            <div className="hp-s3-head pti-bold">56K</div>
            <div className="hp-s3-para">following</div>
          </div>
          <div className="ml-5">
            <div className="hp-s3-head pti-bold">70+</div>
            <div className="hp-s3-para">equipments and technics</div>
          </div>
        </div>
        <div className="hp-s3-right">
          Transforming Agricultural, one Farm at a time
        </div>
      </section>
      <section className="pb-5">
          <FarmersView />
      </section>
    </div>
  );
};

export default Home;

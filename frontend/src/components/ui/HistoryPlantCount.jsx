import { useEffect, useState } from "react";
import axios from "axios";

function HistoryPlantCount() {
  const [plantHistories, setPlantHistories] = useState([]);

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // Ensure the token is available
    if (!token) {
      alert("No token found!");
      return;
    }

    // Fetch the plant history
    axios
      .get("http://localhost:8070/planthistory", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      })
      .then((res) => {
        setPlantHistories(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center h-16">
        <div className="text-[#6A9C89] text-3xl font-bold">
          PLANT COUNT HISTORY
        </div>
      </div>
      <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantHistories.length > 0 ? (
          plantHistories.map((history, i) => (
            <div
              key={i}
              className="bg-[#EFF4F2] rounded-lg shadow-md p-6 hover:bg-slate-300 hover:text-black transition-colors duration-300"
            >
              <h3 className="text-lg font-bold mb-2">{history.plantName}</h3>
              <p className="text-sm">
                <span className="font-semibold">Date and Time: </span>
                {new Date(history.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Length of the land: </span>
                {history.length} m
              </p>
              <p className="text-sm">
                <span className="font-semibold">Width of the land: </span>
                {history.width} m
              </p>
              <p className="text-sm">
                <span className="font-semibold">Plant Count: </span>
                {history.plantCount}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPlantCount;

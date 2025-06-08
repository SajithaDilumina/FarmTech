import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ToolUploadButton from "../components/ToolUploadButton";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the autotable module
import AdminHeader from "../components/shared/AdminHeader";

const Rent_home = () => {
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
  const [bookings, setBookings] = useState({}); // State to hold bookings for tools
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch tools and corresponding bookings
    const fetchToolsAndBookings = async () => {
      try {
        setLoading(true);
        const toolsResponse = await axios.get("http://localhost:8070/tools");
        setTools(toolsResponse.data);

        // Fetch bookings for each tool
        const bookingPromises = toolsResponse.data.map((tool) =>
          axios.get(`http://localhost:8070/tools/${tool._id}/bookings`)
        );

        const bookingsResponses = await Promise.all(bookingPromises);
        const bookingData = {};

        // Map bookings to the corresponding tool IDs
        bookingsResponses.forEach((response, index) => {
          const toolId = toolsResponse.data[index]._id;
          bookingData[toolId] = response.data.bookings; // Set bookings by tool ID
        });

        setBookings(bookingData);
        console.log(bookingData); // Log the categorized bookings
      } catch (err) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchToolsAndBookings();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      axios
        .delete(`http://localhost:8070/tools/${id}`)
        .then((res) => {
          setTools((prev) => prev.filter((tool) => tool._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
        });
    }
  };

  // Filter tools based on search query
  const filteredTools = tools.filter((tool) =>
    tool.tool_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadPDF = () => {
    const pdf = new jsPDF();

    // Define columns for the PDF table, including toolId and bookingIds
    const columns = [
      { header: "Tool ID", dataKey: "toolId" },
      { header: "Title", dataKey: "title" },
      { header: "Price per Day", dataKey: "price" },
      { header: "Booking Details", dataKey: "bookingDetails" },
    ];

    // Prepare data for the table
    const rows = filteredTools.map((tool) => {
      const toolBookings = bookings[tool._id] || [];

      // Create a detailed booking summary with each booking on a new line
      const bookingDetails =
        toolBookings.length > 0
          ? toolBookings
              .map(
                (booking) =>
                  `- Booking ID: ${booking._id}, From: ${new Date(
                    booking.rentFrom
                  ).toLocaleDateString()} - To: ${new Date(
                    booking.rentTo
                  ).toLocaleDateString()}, Name: ${booking.rentName}, Mobile: ${
                    booking.rentMobile
                  }`
              )
              .join("\n" + "\n")
          : "No Bookings";

      return {
        toolId: tool._id, // Add toolId
        title: tool.tool_title,
        price: tool.tool_price, // Adjusted key to reflect price
        bookingDetails: bookingDetails,
      };
    });

    // Create the table in the PDF
    pdf.autoTable({
      head: [columns.map((col) => col.header)],
      body: rows.map((row) => columns.map((col) => row[col.dataKey])),
      styles: { cellPadding: 4, fontSize: 10 }, // Adjust padding and font size for better layout
      columnStyles: {
        toolId: { cellWidth: "auto" }, // Allow toolId column to adjust width automatically
        bookingDetails: { cellWidth: "auto" }, // Allow bookingDetails column to adjust width automatically
      },
      theme: "grid", // Use grid theme for better presentation
    });

    // Save the PDF
    pdf.save("tools_and_bookings.pdf");
  };

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <AdminHeader/>
      <div className="flex ">
        <ToolUploadButton />
        <div className="ml-auto">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="ml-auto">
            <button
              onClick={downloadPDF}
              className="mr-4 flex gap-3 bg-[#6A9C89] text-white p-3 rounded hover:bg- transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download all Booking Details as PDF
            </button>
          </div>
        </div>
      </div>

      <div className="m-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div
              key={tool._id}
              className="flex flex-col cursor-pointer bg-[#E9EFEC] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/tools/${tool._id}`}>
                <div className="relative w-full h-64 bg-[#C4DAD2] flex items-center justify-center rounded-lg overflow-hidden mb-4">
                  {tool.tool_photos.length > 0 ? (
                    <img
                      src={`http://localhost:8070/uploads/${tool.tool_photos[0]}`}
                      alt={tool.tool_title}
                      className="object-cover w-full h-full absolute top-0 left-0"
                      style={{ objectFit: "cover", aspectRatio: "16/9" }}
                    />
                  ) : (
                    <p className="text-[#16423C] text-sm">No Image</p>
                  )}
                </div>
              </Link>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-[#16423C]">
                  {tool.tool_title}
                </h2>
                <p className="text-md text-[#6A9C89] mt-2">
                  {tool.tool_description}
                </p>
              </div>
              <div className="flex ml-auto gap-4">
                <Link
                  to={`/tools/${tool._id}/bookings`}
                  className="flex gap-2 bg-[#6A9C89] rounded text-white p-2  my-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 12.75l6 6m0 0l6-6m-6 6V3"
                    />
                  </svg>
                  View Bookings
                </Link>
                <button
                  onClick={() => handleDelete(tool._id)}
                  className="flex  bg-red-500 rounded text-white p-2  my-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tools found</p>
        )}
      </div>
    </>
  );
};

export default Rent_home;

import React, { useState } from "react";
import axios from "axios"; // Import axios for direct API calls
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
  });
  // Local state for managing loading status and errors
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed'
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.name.trim()) {
      alert("Category name cannot be empty."); // Consider a more user-friendly modal
      return;
    }

    setStatus('loading');
    setError(null); // Clear previous errors

    try {
      // Directly make the API call to post a new category
      const res = await axios.post(
        "http://localhost:8000/api/v1/add/category",
        input
      );
      
      setStatus('succeeded');
      alert("Category added successfully!"); // Consider a more user-friendly modal
      setInput({ name: "" }); // Clear input field
      // In a real app, you might want to re-fetch categories in Home or update the Redux store
      // For this local state version, we just navigate.
      navigate("/"); // Navigate to home or a relevant page after success

    } catch (err) {
      setStatus('failed');
      // More specific error message for network issues
      if (axios.isAxiosError(err) && err.code === 'ERR_NETWORK') {
        setError("Network Error: Could not connect to the server. Please ensure your backend server is running at http://localhost:8000 and check CORS settings.");
      } else {
        setError(err.response?.data?.message || err.message || "Unknown error occurred.");
      }
      console.error("Failed to add category:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="categoryName" className="block text-lg font-medium text-gray-700 mb-2">
              Category Name:
            </label>
            <input
              name="name"
              value={input.name}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              type="text"
              id="categoryName" // Added id for label association
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg placeholder-gray-400"
              placeholder="Enter Category Name"
              required // Added required attribute
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-xl"
            disabled={status === 'loading'} // Disable button while loading
          >
            {status === 'loading' ? 'Adding Category...' : 'Add Category'}
          </button>
        </form>

        {/* Display error message if status is failed */}
        {status === 'failed' && error && (
          <p className="text-red-600 text-center mt-4">{error}</p>
        )}

        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-xl mt-4"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default AddCategory;

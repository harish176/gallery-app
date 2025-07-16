import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  postNewImage,
} from "../redux/reducers/gallerySlice"; // Ensure paths are correct

const AddImage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null); // Initialize with null
  const [category, setCategory] = useState(""); // Initialize with empty string for select
  const [imageTitle, setImageTitle] = useState(""); // Added state for image title

  // Get categories, status, and error from Redux store
  const { categories, status, error } = useSelector((state) => state.gallery);

  useEffect(() => {
    // Fetch all categories when the component mounts
    dispatch(getAllCategories());
  }, [dispatch]); // Add dispatch to dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!file) {
      alert("Please select an image file.");
      return;
    }
    if (!category) {
      alert("Please select a category.");
      return;
    }
    if (!imageTitle.trim()) {
        alert("Please enter an image title.");
        return;
    }

    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("category", category);
    formdata.append("title", imageTitle.trim()); // Append the image title

    // Dispatch postNewImage and wait for its result
    const resultAction = await dispatch(postNewImage(formdata));

    // Check if the post was successful
    if (postNewImage.fulfilled.match(resultAction)) {
      alert("Image uploaded successfully!");
      // Clear form fields
      setFile(null);
      setCategory("");
      setImageTitle("");
      // Optionally reset file input visually (requires a ref or re-rendering input)
      e.target.reset(); // Resets the form fields
      navigate("/"); // Navigate to home or gallery page
    } else {
      // Display error message
      alert(`Failed to upload image: ${error || "Unknown error"}`);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload New Image</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Title Input */}
          <div>
            <label htmlFor="imageTitle" className="block text-lg font-medium text-gray-700 mb-2">
              Image Title:
            </label>
            <input
              type="text"
              id="imageTitle"
              name="imageTitle"
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg placeholder-gray-400"
              placeholder="Enter Image Title"
              required
            />
          </div>

          {/* Image File Input */}
          <div>
            <label htmlFor="imageFile" className="block text-lg font-medium text-gray-700 mb-2">
              Image File:
            </label>
            <input
              type="file"
              id="imageFile"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 block w-full text-lg text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          {/* Category Select */}
          <div>
            <label htmlFor="imageCategory" className="block text-lg font-medium text-gray-700 mb-2">
              Category:
            </label>
            <select
              id="imageCategory"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg bg-white appearance-none pr-8"
              required
            >
              <option value="" disabled>
                Please Select
              </option>
              {categories && categories.length > 0 ? (
                categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>Loading categories...</option>
              )}
            </select>
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 text-xl"
            disabled={status === 'loading'} // Disable button while loading
          >
            {status === 'loading' ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>

        {/* Display error message if status is failed */}
        {status === 'failed' && error && (
          <p className="text-red-600 text-center mt-4">{error}</p>
        )}

        {/* Go to Home Button */}
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

export default AddImage;

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getAllCategories,
//   getAllImages,
//   getSingleImage,
// } from "../redux/reducers/gallerySlice";

// const Home = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllImages());
//     dispatch(getAllCategories());
//   }, [dispatch]); // Added dispatch to dependency array

//   const { images, categories, status, error } = useSelector((state) => state.gallery); // Destructure status and error

//   const handleCategories = (id) => {
//     dispatch(getSingleImage(id));
//   };

//   return (
//     <div className="container mx-auto my-3 px-4 md:my-6 lg:my-8"> {/* Converted container and spacing */}
//       <div className="flex flex-col items-center mb-6"> {/* Converted row and align="center" */}
//         <button
//           onClick={() => dispatch(getAllImages())}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 my-2 md:my-0" // Converted button styles
//         >
//           All
//         </button>

//         <div className="flex flex-wrap justify-center mt-4 md:mt-0"> {/* Wrapper for category buttons */}
//           {categories && categories.length > 0 ? (
//             categories.map((item) => {
//               return (
//                 <button
//                   key={item._id} // Added key for list rendering
//                   onClick={() => handleCategories(item._id)}
//                   className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-sm border border-gray-300 mx-2 my-1 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2" // Converted button styles
//                 >
//                   {item.name}
//                 </button>
//               );
//             })
//           ) : (
//             <p className="text-gray-500">
//               {status === 'loading' && categories.length === 0 ? "Loading categories..." : "No categories available."}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Removed <br /> as spacing is handled by Tailwind classes */}

//       {status === 'loading' && images.length === 0 ? (
//         <p className="text-center text-xl text-gray-600 mt-8">Loading images...</p>
//       ) : status === 'failed' ? (
//         <p className="text-center text-xl text-red-600 mt-8">Error: {error}</p>
//       ) : images && images.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"> {/* Converted grid and spacing */}
//           {images.map((item, index) => {
//             return (
//               <div
//                 key={item._id || index} // Added key for list rendering
//                 className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl" // Converted card styles
//               >
//                 <img
//                   src={`http://localhost:8000/${item.name}`}
//                   className="w-full h-64 object-cover rounded-t-xl" // Converted img styles, removed fixed height/width
//                   alt={`Gallery item ${item.name || index}`} // Added alt text
//                 />
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p className="text-center text-xl text-gray-600 mt-8">No images to display.</p> // Added message for no images
//       )}
//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  getAllImages,
  getSingleImage,
} from "../redux/reducers/gallerySlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllImages());
    dispatch(getAllCategories());
  }, [dispatch]); // Added dispatch to dependency array

  const { images, categories, status, error } = useSelector((state) => state.gallery); // Destructure status and error

  const handleCategories = (id) => {
    dispatch(getSingleImage(id));
  };

  return (
    // Main container with a light background and padding
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      {/* Category filter section */}
      <div className="flex flex-col items-center mb-10 p-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Explore Categories</h2>
        
        {/* All button */}
        <button
          onClick={() => dispatch(getAllImages())}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 mb-4"
        >
          All Images
        </button>

        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-4"> {/* Added gap for spacing */}
          {categories && categories.length > 0 ? (
            categories.map((item) => (
              <button
                key={item._id}
                onClick={() => handleCategories(item._id)}
                className="bg-white hover:bg-blue-50 text-blue-700 font-semibold py-2 px-5 rounded-full shadow-md border border-blue-300 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-sm"
              >
                {item.name}
              </button>
            ))
          ) : (
            <p className="text-gray-600 text-lg">
              {status === 'loading' && categories.length === 0 ? "Loading categories..." : "No categories available."}
            </p>
          )}
        </div>
      </div>

      {/* Image gallery section */}
      {status === 'loading' && images.length === 0 ? (
        <p className="text-center text-2xl text-gray-700 mt-12 font-medium">Loading images...</p>
      ) : status === 'failed' ? (
        <p className="text-center text-2xl text-red-600 mt-12 font-bold">Error: {error}</p>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-12 max-w-7xl mx-auto"> {/* Enhanced grid and spacing */}
          {images.map((item, index) => {
            return (
              <div
                key={item._id || index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl border border-gray-200"
              >
                <img
                  src={`https://gallery-app-1-r18o.onrender.com/${item.name}`}
                  className="w-full h-64 object-cover rounded-t-2xl border-b-2 border-gray-100"
                  alt={`Gallery item ${item.name || index}`}
                />
                {/* Optional: Add image title or description */}
                {item.title && (
                  <div className="p-4">
                    <p className="text-lg font-semibold text-gray-800 truncate">{item.title}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-2xl text-gray-600 mt-12 font-medium">No images to display.</p>
      )}
    </div>
  );
};

export default Home;

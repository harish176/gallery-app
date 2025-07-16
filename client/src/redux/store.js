import { configureStore } from "@reduxjs/toolkit";
import gallerySlice from "./reducers/gallerySlice";

const store = configureStore({
    // Corrected: 'reducer' should be singular, not 'reducers'
    reducer: {
        gallery: gallerySlice,
    },
});

export default store;

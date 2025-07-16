import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialValues = {
    images: [],
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const getAllImages = createAsyncThunk(
    "images/fetchallimages",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("https://gallery-app-1-r18o.onrender.com/v1/get/images");
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getAllCategories = createAsyncThunk(
    "images/fetchallcategories", // Typo: should probably be categories/fetchallcategories
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("https://gallery-app-1-r18o.onrender.com/v1/get/categories");
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const postNewCategory = createAsyncThunk(
    "images/postnewcategory", // Typo: should probably be categories/postnewcategory
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                "https://gallery-app-1-r18o.onrender.com/v1/add/category",
                payload
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const postNewImage = createAsyncThunk(
    "images/postnewimage", // Typo: should probably be images/postnewimage
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                "https://gallery-app-1-r18o.onrender.com/v1/upload/image",
                payload
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getSingleImage = createAsyncThunk(
    "images/getsingleImageData",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `https://gallery-app-1-r18o.onrender.com/v1/get/singleimage?category=${payload}`
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const gallerySlice = createSlice({
    name: "galleryslice",
    initialState: initialValues,
    reducers: {},
    // Corrected: Using the builder callback notation for extraReducers
    extraReducers: (builder) => {
        builder
            // getAllImages
            .addCase(getAllImages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllImages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload;
            })
            .addCase(getAllImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            // getAllCategories
            .addCase(getAllCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            // postNewCategory
            .addCase(postNewCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postNewCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Assuming you might want to add the new category to the list
                // state.categories.push(action.payload);
            })
            .addCase(postNewCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            // postNewImage
            .addCase(postNewImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postNewImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Assuming you might want to add the new image to the list
                // state.images.push(action.payload);
            })
            .addCase(postNewImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            // getSingleImage
            .addCase(getSingleImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSingleImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload; // Update images with the filtered results
            })
            .addCase(getSingleImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default gallerySlice.reducer;

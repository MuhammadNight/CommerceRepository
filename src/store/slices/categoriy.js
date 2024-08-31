import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: [],
    isCategoriyLoad: false,
    isCategoriyError: null,
};

export const fetchCategoriyData = createAsyncThunk(
    "categoriy/fetchCategoriyData",
    async (url) => {
        const res = await axios.get(url);
        return res.data;
    }
);

const categoriySlice = createSlice({
    name: "categoriy",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriyData.pending, (state) => {
                state.isCategoriyLoad = true;
                state.isCategoriyError = null;
            })
            .addCase(fetchCategoriyData.fulfilled, (state, action) => {
                state.isCategoriyLoad = false;
                state.Categoriyinations = action.payload;
            })
            .addCase(fetchCategoriyData.rejected, (state, action) => {
                state.isCategoriyLoad = false;
                state.isCategoriyError = action.error.message;
            })
    }
});

export default categoriySlice.reducer;

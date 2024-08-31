import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProductData = createAsyncThunk(
    'product/fetchProductData',
    async (url) => {
        const res = await axios.get(url);
        return res.data;
    }
);

export const createProductData = createAsyncThunk(
    "product/createProductData",
    async (data) => {
        const res = await axios.post('https://commercebase.onrender.com/products', data);
        return res.data;
    }
);

export const deleteProductData = createAsyncThunk(
    "product/deleteProductData",
    async (id) => {
        await axios.delete(`https://commercebase.onrender.com/products/${id}`);
        return id;
    }
);


const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        isProductLoad: false,
        isProductError: null,
        selectProductId: null,
        favorites: [], 
        cart: [] 
    },
    reducers: {
        updateFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        updateCart: (state, action) => {
            state.cart = action.payload;
        },
        setSelectProductId: (state, action) => { 
            state.selectProductId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductData.pending, (state) => {
                state.isProductLoad = true;
                state.isProductError = null;
            })
            .addCase(fetchProductData.fulfilled, (state, action) => {
                state.isProductLoad = false;
                state.products = action.payload;
            })
            .addCase(fetchProductData.rejected, (state, action) => {
                state.isProductLoad = false;
                state.isProductError = action.error.message;
            })
            .addCase(createProductData.pending, (state) => {
                state.isProductLoad = true;
                state.isProductError = null;
            })
            .addCase(createProductData.fulfilled, (state, action) => {
                state.isProductLoad = false;
                state.products.push(action.payload);
            })
            .addCase(createProductData.rejected, (state, action) => {
                state.isProductLoad = false;
                state.isProductError = action.error.message;
            })
            .addCase(deleteProductData.pending, (state) => {
                state.isProductLoad = true;
                state.isProductError = null;
            })
            .addCase(deleteProductData.fulfilled, (state, action) => {
                state.isProductLoad = false;
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProductData.rejected, (state, action) => {
                state.isProductLoad = false;
                state.isProductError = action.error.message;
            })
    },
});

export const { updateFavorites, updateCart, setSelectProductId } = productSlice.actions;
export default productSlice.reducer;

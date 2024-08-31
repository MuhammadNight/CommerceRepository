import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const updateGamingData = createAsyncThunk(
    "gaming/updateGamingData",
    async ({ id, name, description, newProduct, bestseller, processor, RAM, storage, GPU, CategoryId, imageUrl, price }) => {
        const res = await axios.put(`https://commercebase.onrender.com/products/${id}`, {
            name, description, newProduct, bestseller, processor, RAM, storage, GPU, CategoryId, imageUrl, price
        });
        return res.data;
    }
);

import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateHeadphoneData = createAsyncThunk(
    "headphones/updateHeadphoneData",
    async ({ id, name, description, newProduct, bestseller, battery_life, noise_canceling, CategoryId, imageUrl, price }) => {
        const res = await axios.put(`https://commercebase.onrender.com/products/${id}`, {
            name, description, newProduct, bestseller, battery_life, noise_canceling, CategoryId, imageUrl, price
        });
        return res.data;
    }
);

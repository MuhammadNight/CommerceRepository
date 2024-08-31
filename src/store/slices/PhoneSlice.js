import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const updatePhoneData = createAsyncThunk(
    "product/updateProductData",
    async ({ id, name, Description, newProduct, bestseller, screen_size, cpu,CategoryId, number_of_cores, Main_camera, Front_camera, Battery_capacity, imageUrl, price }) => {
        const res = await axios.put(`https://commercebase.onrender.com/products/${id}`, {
            name, Description, newProduct, bestseller, screen_size, cpu,CategoryId, number_of_cores, Main_camera, Front_camera, Battery_capacity, imageUrl, price
        });
        return res.data;
    }
);


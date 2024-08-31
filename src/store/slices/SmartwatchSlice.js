import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const updateSmartwatchData = createAsyncThunk(
    'smartwatch/updateSmartwatchData',
    async ({ id, name, description, newProduct, bestseller, displayType, batteryLife, connectivity, CategoryId, imageUrl, price }) => {
        const res = await axios.put(`https://commercebase.onrender.com/products/${id}`, {
            name,
            description,
            newProduct,
            bestseller,
            displayType,
            batteryLife,
            connectivity,
            CategoryId,
            imageUrl,
            price
        });
        return res.data;
    }
);

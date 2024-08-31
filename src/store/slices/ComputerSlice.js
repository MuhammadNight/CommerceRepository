import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const updateComputerData = createAsyncThunk(
    "computer/updateComputerData",
    async ({ id, name, description, newProduct, bestseller, processor, RAM, storage, CategoryId, imageUrl, price }) => {
        const res = await axios.put(`https://commercebase.onrender.com/products/${id}`, {
            name, description, newProduct, bestseller, processor, RAM, storage, CategoryId, imageUrl, price
        });
        return res.data;
    }
);

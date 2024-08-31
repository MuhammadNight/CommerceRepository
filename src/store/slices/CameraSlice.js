import { createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const updateCameraData = createAsyncThunk(
    "camera/updateCameraData",
    async ({ id, name, description, newProduct, bestseller, sensor, resolution, ISO_range, CategoryId, imageUrl, price }) => {
        const res = await axios.put(`https://commercebase.onrender.com/products/${id}`, {
            name, description, newProduct, bestseller, sensor, resolution, ISO_range, CategoryId, imageUrl, price
        });
        return res.data;
    }
);


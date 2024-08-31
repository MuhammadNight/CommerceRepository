
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSidebar: false,
    ShowModal: false,
    modalType: null,
    selectProductId: null,
    screenSize: window.innerWidth,
};

const pageActionSlice = createSlice({
    name: "pageActions",
    initialState,
    reducers: {
        toggleModalAlert: (state) => {
            state.ShowModal = !state.ShowModal;
        },
        setModalType: (state, action) => {
            state.modalType = action.payload;
        },
        toggleSidebar: (state) => {
            state.showSidebar = !state.showSidebar;
        },
        setSelectProductId: (state, action) => {
            state.selectProductId = action.payload;
        },
        setScreenSize: (state, action) => {
            state.screenSize = action.payload;
            if (state.screenSize < 768) {
                state.showSidebar = false;
            }
        },
    },
});

export const { toggleSidebar,toggleModalAlert, setSelectProductId, setScreenSize,setModalType } = pageActionSlice.actions;
export default pageActionSlice.reducer;

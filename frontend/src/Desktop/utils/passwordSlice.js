import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
    name: 'passwords',
    initialState: {
        passwords: [],
        selectedCategory: null,
        selectedItem: null,
        rowItems: [],
        status: "Connected",
        itemClose: false,
    },
    reducers: {
        setPasswordItems: (state, action) => {
            state.passwords = action.payload;
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setItem: (state, action) => {
            state.selectedItem = action.payload;
        },
        setRowItems: (state, action) => {
            state.rowItems = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setItemClose: (state) => {
            state.itemClose = !state.itemClose;
        }
    }
})

export default passwordSlice.reducer;
export const {
    setPasswordItems,
    setCategory,
    setItem,
    setRowItems,
    setStatus,
    setItemClose
} = passwordSlice.actions;
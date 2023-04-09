import { createSlice } from "@reduxjs/toolkit";

const updateCategorySlice = createSlice({
    name : "updateCategory",
    initialState : {
        category : {
            Category : null,
            isFetching : false,
            error : false 
        },
       
    },
    reducers : {
        updateCategoryStart : (state) =>{
            state.category.isFetching = true;
        },
        updateCategorySuccess : (state,action) =>{
            state.category.Category = action.payload;
            state.category.isFetching = false;
        },
        updateCategoryFailed : (state) =>{
            state.category.error = true
        },
    }
})

export const {
    updateCategoryFailed,
    updateCategorySuccess,
    updateCategoryStart,
} = updateCategorySlice.actions

export default updateCategorySlice.reducer;
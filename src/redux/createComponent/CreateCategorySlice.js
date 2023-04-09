import { createSlice } from "@reduxjs/toolkit";

const createCategorySlice = createSlice({
    name : "createCategory",
    initialState : {
        category : {
            Category : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        createCategoryStart : (state) =>{
            state.category.isFetching = true;
        },
        createCategorySuccess : (state,action) =>{
            state.category.Category = action.payload;
            state.category.isFetching = false;
        },
        createCategoryFailed : (state) =>{
            state.category.error = true
        }
    }
})

export const {
    createCategoryFailed,
    createCategorySuccess,
    createCategoryStart
} = createCategorySlice.actions

export default createCategorySlice.reducer;
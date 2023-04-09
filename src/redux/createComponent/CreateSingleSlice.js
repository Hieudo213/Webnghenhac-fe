import { createSlice } from "@reduxjs/toolkit";

const createSingleSlice = createSlice({
    name : "createSingle",
    initialState : {
        single : {
            Single : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        createSingleStart : (state) =>{
            state.single.isFetching = true;
        },
        createSingleSuccess : (state,action) =>{
            state.single.Single = action.payload;
            state.single.isFetching = false;
        },
        createSingleFailed : (state) =>{
            state.single.error = true
        }
    }
})

export const {
    createSingleFailed,
    createSingleSuccess,
    createSingleStart
} = createSingleSlice.actions

export default createSingleSlice.reducer;
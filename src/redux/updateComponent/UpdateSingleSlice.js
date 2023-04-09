import { createSlice } from "@reduxjs/toolkit";

const updateSingleSlice = createSlice({
    name : "updateSingle",
    initialState : {
        single : {
            Single : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
        updateSingleStart : (state) =>{
            state.single.isFetching = true;
        },
        updateSingleSuccess : (state,action) =>{
            state.single.Single = action.payload;
            state.single.isFetching = false;
        },
        updateSingleFailed : (state) =>{
            state.single.error = true
        }
    }
})

export const {
    updateSingleFailed,
    updateSingleSuccess,
    updateSingleStart
} = updateSingleSlice.actions

export default updateSingleSlice.reducer;
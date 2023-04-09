import { createSlice } from "@reduxjs/toolkit";

const activateSingleSlice = createSlice({
    name : "activateSingle",
    initialState : {
        single : {
            Album : null,
            isFetching : false,
            error : false 
        }
    },
    reducers : {
       activateSingleStart : (state) =>{
            state.single.isFetching = true;
        },
       activateSingleSuccess : (state,action) =>{
            state.single.Album = action.payload;
            state.single.isFetching = false;
        },
       activateSingleFailed : (state) =>{
            state.single.error = true
        },    
    }
})

export const {
    activateSingleFailed,
    activateSingleStart,
    activateSingleSuccess
} = activateSingleSlice.actions

export default activateSingleSlice.reducer;
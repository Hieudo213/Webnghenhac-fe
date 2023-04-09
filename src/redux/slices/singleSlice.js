import { createSlice } from "@reduxjs/toolkit";

const singleSlice = createSlice({
    name : "single",
    initialState:{
        single:{
            Single:null,
            isFetching : false,
            error:false
        }, 
        singles : {
          Singles : null,
          isFetching : false,
          error : false
        },
        resetSingle : {
            isFetching : false,
            error : false
        }
    },
    reducers:{
       getSingleStart: (state)=>{
            state.single.isFetching=true;
        },
       getSingleSuccess: (state,action) =>{
            state.single.isFetching=false;
            state.single.Single = action.payload;
        },  
       getSingleFailed: (state)=>{
            state.single.isFetching=false;
            state.single.error=true;
        },
        ResetSingleStart : (state)=>{
            state.resetSingle.isFetching =true;
        },
        ResetSingleSuccess : (state)=>{
            state.resetSingle.isFetching =false;
            state.resetSingle.error =false;
            state.single.Single = null;
        },
        ResetSingleFailed : (state)=>{
            state.resetSingle.isFetching =true;
            state.resetSingle.error =true;
        },
        getSinglesStart : (state)=>{
            state.singles.isFetching = true;
        },
        getSinglesSuccess : (state,action)=>{
            state.singles.isFetching=false;
            state.singles.Singles = action.payload;
            state.singles.error = false;
        },
        getSinglesFailed : (state)=>{
            state.singles.isFetching=false;
            state.singles.error = true;
        }
    }
})

export const {
   getSingleFailed,
   getSingleStart,
   getSingleSuccess,
   ResetSingleFailed,
   ResetSingleStart,
   ResetSingleSuccess,
   getSinglesFailed,
   getSinglesSuccess,
   getSinglesStart
} = singleSlice.actions;

export default singleSlice.reducer;
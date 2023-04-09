import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : {
            User : null,
            isFetching : false,
            error:false
        }
    },
    reducers :{
        updateUserStart : (state)=>{
            state.user.isFetching=true;
        },
        updateUserSuccess : (state,action)=>{
            state.user.isFetching=false;
            state.user.User= action.payload;
        },
        updateUserFailed : (state)=>{
            state.user.isFetching=false;
            state.user.error = true;
        }
    }
})

export  const {
    updateUserFailed,
    updateUserStart,
    updateUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
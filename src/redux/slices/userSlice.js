import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : {
            User : null,
            isFetching : false,
            error:false
        },
        deletedUser : {
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
        },

        deleteUserStart : (state)=>{
            state.deletedUser.isFetching=true;
        },
        deleteUserSuccess : (state,action)=>{
            state.deletedUser.isFetching=false;
            state.deletedUser.User= action.payload;
        },
        deleteUserFailed : (state)=>{
            state.deletedUser.isFetching=false;
            state.deletedUser.error = true;
        }
    }
})

export  const {
    updateUserFailed,
    updateUserStart,
    updateUserSuccess,
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
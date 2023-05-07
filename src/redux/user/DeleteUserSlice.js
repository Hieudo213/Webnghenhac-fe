import { createSlice } from "@reduxjs/toolkit";

const deleteUserSlice = createSlice({
    name : "deleteUser",
    initialState : {
    User : {
            message : null,
            isFetching : false,
            error : false 
    }
    },
    reducers : {
        deleteUserStart : (state) =>{
            state.User.isFetching = true;
        },
        deleteUserSuccess : (state,action) =>{
            state.User.message = action.payload;
            state.User.isFetching = false;
        },
        deleteUserFailed : (state) =>{
            state.User.error = true
        },

        
    }
})

export const {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess
} = deleteUserSlice.actions

export default deleteUserSlice.reducer;
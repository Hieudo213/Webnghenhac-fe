import { createSlice } from "@reduxjs/toolkit";

const updateRoleSlice = createSlice({
    name : "updateRole",
    initialState : {
    role : {
            Role : null,
            isFetching : false,
            error : false 
    }
    },
    reducers : {
        updateRoleStart : (state) =>{
            state.role.isFetching = true;
        },
        updateRoleSuccess : (state,action) =>{
            state.role.Role = action.payload;
            state.role.isFetching = false;
        },
        updateRoleFailed : (state) =>{
            state.role.error = true
        },

        
    }
})

export const {
    updateRoleFailed,
    updateRoleSuccess,
    updateRoleStart,
} = updateRoleSlice.actions

export default updateRoleSlice.reducer;
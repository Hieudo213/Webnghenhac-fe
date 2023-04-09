import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
    name : "genre",
    initialState:{
        genre:{
            Genre:null,
            isFetching : false,
            error:false
        },
    },
    reducers:{
       getGenreStart: (state)=>{
            state.genre.isFetching=true;
        },
       getGenreSuccess: (state,action) =>{
            state.genre.isFetching=false;
            state.genre.Genre = action.payload;
        },  
       getGenreFailed: (state)=>{
            state.genre.isFetching=false;
            state.genre.error=true;
        }
    }
})

export const {
   getGenreFailed,
   getGenreStart,
   getGenreSuccess
} = genreSlice.actions;

export default genreSlice.reducer;
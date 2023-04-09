import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
    name : "artist",
    initialState:{
        artist:{
            Artist:null,
            isFetching : false,
            error:false
        },
    },
    reducers:{
       getArtistStart: (state)=>{
            state.artist.isFetching=true;
        },
       getArtistSuccess: (state,action) =>{
            state.artist.isFetching=false;
            state.artist.Artist = action.payload;
        },  
       getArtistFailed: (state)=>{
            state.artist.isFetching=false;
            state.artist.error=true;
        }
    }
})

export const {
   getArtistFailed,
   getArtistStart,
   getArtistSuccess
} = artistSlice.actions;

export default artistSlice.reducer;
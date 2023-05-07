import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Root from './routes/root';
import ErrorPage from './errors/error';
import Browse from './modules/Browse/Browse';
import ListenNow from './modules/ListenNow/ListenNow';
import Genre from './modules/Genre/Genre';
import Song from './modules/Songs/Song';
import Artist from './modules/Artists/Artist';
import Album from './modules/Album/Album';
import Playlist from './modules/Playlist/Playlist';
import AlbumItem from './content/album/AlbumItem';
import ArtistItem from './content/artist/ArtistItem';
import SongItem from './content/song/SongItem';
import ArtistList from './modules/Artists/ArtistList';
import SingleItem from './content/single/SingleItem';
import PlaylistItem from './content/playlist/PlaylistItem';
import GenreItem from './content/genre/GenreItem';
import {persistor,store} from './redux/store'
import Account from './modules/Account/Account';
import { Provider } from 'react-redux';
import Loginn from './modules/Login/Loginn';
import Registerr from './modules/Register/Registerr';
import Page from './admin/Page/Page';
import ArtistPage from './admin/Artist/ArtistPage';
import AlbumPage from './admin/Album/AlbumPage';
import PlaylistPage from './admin/Playlist/PlaylistPage';
import SinglePage from './admin/Single/SinglePage';
import SongPage from './admin/Song/SongPage';
import Single from './modules/Single/Single';
import AlbumItemPage from './admin/Album/AlbumItemPage';
import ArtistItemPage from './admin/Artist/ArtistItemPage';
import SingleItemPage from './admin/Single/SingleItemPage';
import PlaylistItemPage from './admin/Playlist/PlaylistItemPage';
import SongItemPage from './admin/Song/SongItemPage';
import CategoryPage from './admin/Category/CategoryPage';
import CategoryItemPage from './admin/Category/CategoryItemPage';
import UserList from './admin/User/UserList';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement : <ErrorPage/>,
  
    children: [
      {
        path: "/listennow",
        element: <ListenNow/>
      },
      {
        path: "/browse",
        element: <Browse/>
      },
      {
        path: "/admin/update/album",
        element: <Album/>
      },
      {
        path: "/admin/update/artist",
        element: <Artist/>
      },
      {
        path: "/admin/update/song",
        element: <Song/>
      },
      {
        path: "genre",
        element: <Genre/>
      },
      {
        path: "/admin/update/playlist",
        element: <Playlist/>
      },
      {
        path: "/album/:id",
        element: <AlbumItem/>
      },
      {
        path: "/artists/:id",
        element: <ArtistItem/>
      },{
        path: "song/artist/:id",
        element: <SongItem/>
      },{
        path: "artists",
        element: <ArtistList/>
      },
      {
        path:"/single/:id",
        element:<SingleItem/> 
      },
      {
        path:"/playlist/:id",
        element:<PlaylistItem/> 
      },
      {
        path:"/genre/:id",
        element:<GenreItem/> 
      },
      {
        path: "/account",
        element: <Account/>
      },
      {
        path: "admin/page",
        element : <Page/>
      },
      {
        path: "/admin/artist",
        element: <ArtistPage/>
      },
      {
        path: "/admin/album",
        element: <AlbumPage/>
      },
      {
        path: "/admin/playlist",
        element: <PlaylistPage/>
      },
      {
        path: "/admin/single",
        element: <SinglePage/>
      },
      {
        path: "/admin/song",
        element: <SongPage/>
      },
      {
        path: "/admin/update/single",
        element: <Single/>
      },
      {
        path: "/admin/album/:id",
        element: <AlbumItemPage/>
      },
      {
        path: "/admin/artist/:id",
        element: <ArtistItemPage/>
      },
      {
        path: "/admin/single/:id",
        element: <SingleItemPage/>
      },
      {
        path: "/admin/update/playlist/:id",
        element: <PlaylistItemPage/>
      },
      {
        path: "/admin/song/:id",
        element: <SongItemPage/>
      },
      {
        path: "/admin/category",
        element: <CategoryPage/>
      },
      {
        path: "/admin/update/category/:id",
        element: <CategoryItemPage/>
      },
      {
        path: "/admin/user-list",
        element: <UserList/>
      },
    ],
  },
  {
    path : "/login",
    element : <Loginn/>
  },
  {
    path : "/register",
    element : <Registerr/>
  },  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading ={null} persistor = {persistor}>
     <RouterProvider router={router}/>
    </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

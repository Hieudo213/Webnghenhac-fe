import React from "react";
import "./Page.css";
import { Link } from "react-router-dom";

function Page() {
  return (
    <div id="page-container">
      <div className="page-main">
      <Link to={"/admin/category"} className="page-content">
          <div className="page-text">Create Category</div>
        </Link>
        <Link to={"/admin/artist"} className="page-content">
          <div className="page-text">Create Artist</div>
        </Link>
        <Link to={"/admin/album"} className="page-content">
          <div className="page-text">Create Album</div>
        </Link>
        <Link to={"/admin/single"} className="page-content">
          <div className="page-text">Create Single</div>
        </Link>
        <Link to={"/admin/playlist"} className="page-content">
          <div className="page-text">Create Playlist</div>
        </Link>
        <Link to={"/admin/song"} className="page-content">
          <div className="page-text">Create Song</div>
        </Link>


        <Link to={"/admin/update/artist"} className="page-content">
          <div className="page-text">Update Artist</div>
        </Link>
        <Link to={"/admin/update/album"} className="page-content">
          <div className="page-text">Update Album</div>
        </Link>
        <Link to={"/admin/update/single"} className="page-content">
          <div className="page-text">Update Single</div>
        </Link>
        <Link to={"/admin/update/song"} className="page-content">
          <div className="page-text">Update Song</div>
        </Link>
        <Link to={"/admin/update/playlist"} className="page-content">
          <div className="page-text">Update Playlist</div>
        </Link>
        <Link to={"/admin/user-list"} className="page-content">
          <div className="page-text">List User</div>
        </Link>
      </div>
    </div>
  );
}

export default Page;

import {React,useState,useRef} from "react";
import "./PlaylistPage.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../redux/apiRequest";
function PlaylistPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleX = () => {
    titleRef.current.value = "";
    descriptionRef.current.value = "";

  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    const Playlist = {
      title : title,
      description : description,
    };

    createPlaylist(Playlist,dispatch,navigate);
  }
  return (
    <div id="playlist-page-container">
      <div className="playlist-page-main">
        <form className="playlist-page-content" onSubmit={handleSubmit}>
          <div className="playlist-page-content-name">
            <label htmlFor="" className="playlist-page-content-name-label">
              {" "}
              Title :{" "}
            </label>
            <input
              ref={titleRef}
              type="text"
              className="playlist-page-content-name-input"
              placeholder="Nhập tên playlist"
              onChange={handleTitle}
            />
          </div>

          <div className="playlist-page-content-description">
            <label htmlFor="" className="playlist-page-content-description-label">
              {" "}
              Description :{" "}
            </label>
            <input
              ref={descriptionRef}
              type="text"
              className="playlist-page-content-description-input"
              placeholder="Nhập mô tả playlist "
              onChange={handleDescription}
            />
          </div>

          
          <div className="playlist-page-content-">
            <button className="btn-agree">Xác nhận </button>
            <button className="btn-agree" onClick={handleX}>Nhập lại </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaylistPage;

import {React,useState,useRef,useEffect} from "react";
import "./AlbumPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAlbum } from "../../redux/apiRequest";
function AlbumPage() {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [releaseYear,setReleaseYear] = useState();
  const [genre,setGenre] = useState("");
  const [publisher,setPublisher] = useState("");
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const releaseYearRef = useRef(null);
  const genreRef = useRef(null);
  const publisherRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 


  const handleTitle = (e)=>{
    setTitle(e.target.value);
  }

  const handleDescription = (e)=>{
    setDescription(e.target.value);
  }

  const handleReleaseYear = (e)=>{
    setReleaseYear(e.target.value);
  }

  const handleGenre = (e)=>{
    setGenre(e.target.value);
  }

  const handlePublisher =(e)=>{
    setPublisher(e.target.value);
  }
  
  const handleX = ()=>{
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    releaseYearRef.current.value = null;
    genreRef.current.value = "";
    publisherRef.current.value = "";
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    const Album = {
      title : title,
      description : description,
      releaseYear : releaseYear,
      genre : genre,
      publisher : publisher
    };

    createAlbum(Album,dispatch,navigate);
  }

  return (

    <div id="album-page-id">
      <div className="album-page-main">
       


        <form className="album-page-content" onSubmit={handleSubmit}>
          <div className="album-page-content-name">
            <label htmlFor="" className="album-page-content-name-label">
              {" "}
              Title :{" "}
            </label>
            <input
              ref={titleRef}
              type="text"
              className="album-page-content-name-input"
              placeholder="Nhập tên Album"
              onChange={handleTitle}
            />
          </div>

          <div className="album-page-content-description">
            <label htmlFor="" className="album-page-content-description-label">
              {" "}
              Description :{" "}
            </label>
            <input
            ref={descriptionRef}
              type="text"
              className="album-page-content-description-input"
              placeholder="Nhập mô tả Album "
              onChange={handleDescription}
            />
          </div>

          <div className="album-page-content-dob">
            <label htmlFor="" className="album-page-content-dob-label">
              {" "}
              Release Year :{" "}
            </label>
            <input
            ref={releaseYearRef}
              type="text"
              className="album-page-content-dob-input"
              placeholder="Nhập năm phát hành"
              onChange={handleReleaseYear}
            />
          </div>

          <div className="album-page-content-pob">
            <label htmlFor="" className="album-page-content-pob-label">
              {" "}
             Genre:{" "}
            </label>
            <input
            ref={genreRef}
              type="text"
              className="album-page-content-pob-input"
              placeholder="Nhập tên thể loại"
              onChange={handleGenre}
            />
          </div>

          <div className="album-page-content-pob">
            <label htmlFor="" className="album-page-content-pob-label">
              {" "}
            Publisher:{" "}
            </label>
            <input
            ref={publisherRef}
              type="text"
              className="album-page-content-pob-input"
              placeholder="Nhập tên nhà phát hành"
              onChange={handlePublisher}
            />
          </div>

          
          
          <div className="album-page-content-">
            <button className="btn-agree">Xác nhận </button>
            <button className="btn-agree" onClick={handleX}>Nhập lại </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlbumPage;

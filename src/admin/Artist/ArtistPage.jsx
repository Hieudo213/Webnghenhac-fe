import {React, useState, useRef} from "react";
import "./ArtistPage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createArtist } from "../../redux/apiRequest";
function ArtistPage() {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dobRef = useRef(null);
  const pobRef = useRef(null);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [dateOfBirth,setBirthOfDate] = useState("");
  const [placeOfBirth,setPlaceOfBirth] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleX = () =>{
   nameRef.current.value = "";
   descriptionRef.current.value = "";
   dobRef.current.value = "";
   pobRef.current.value = "";
  }

  const handleName = (e)=>{
    setName(e.target.value);
  }

  const handleDescription = (e)=>{
    setDescription(e.target.value);
  }

  const handleDob = (e)=>{
    setBirthOfDate(e.target.value);
  }

  const handlePob = (e)=>{
    setPlaceOfBirth(e.target.value);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const Artist = {
      name : name,
      description : description,
      dateOfBirth : dateOfBirth,
      placeOfBirth : placeOfBirth
    };
    
    createArtist(Artist,dispatch,navigate);
  }

  return (
    <div id="artist-page-container">
      <div className="artist-page-main">
        <form className="artist-page-content" onSubmit={handleSubmit}>
          <div className="artist-page-content-name">
            <label htmlFor="" className="artist-page-content-name-label">
              {" "}
              Name :{" "}
            </label>
            <input
              ref={nameRef}
              type="text"
              className="artist-page-content-name-input"
              placeholder="Nhập tên ca sĩ"
              onChange={handleName}
            />
          </div>

          <div className="artist-page-content-description">
            <label htmlFor="" className="artist-page-content-description-label">
              {" "}
              Description :{" "}
            </label>
            <input
              ref={descriptionRef}
              type="text"
              className="artist-page-content-description-input"
              placeholder="Nhập mô tả ca sĩ "
              onChange={handleDescription}
            />
          </div>

          <div className="artist-page-content-dob">
            <label htmlFor="" className="artist-page-content-dob-label">
              {" "}
              Date Of Birth :{" "}
            </label>
            <input
              ref={dobRef}
              type="text"
              className="artist-page-content-dob-input"
              placeholder="Nhập ngày sinh ca sĩ"
              onChange={handleDob}
            />
          </div>

          <div className="artist-page-content-pob">
            <label htmlFor="" className="artist-page-content-pob-label">
              {" "}
              Place Of Birth :{" "}
            </label>
            <input
              ref={pobRef}
              type="text"
              className="artist-page-content-pob-input"
              placeholder="Nhập nơi sinh ca sĩ"
              onChange={handlePob}
            />
          </div>
          <div className="artist-page-content-button">
            <button className="btn-agree">Xác nhận </button>
            <button className="btn-agree" onClick={handleX}>Nhập lại </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArtistPage;

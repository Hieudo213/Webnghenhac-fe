import { React, useState, useRef } from "react";
import "./SinglePage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSingle } from "../../redux/apiRequest";
function SinglePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState();
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [length, setLength] = useState("");
  const lengthRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const releaseYearRef = useRef(null);
  const genreRef = useRef(null);
  const publisherRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleReleaseYear = (e) => {
    setReleaseYear(e.target.value);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handlePublisher = (e) => {
    setPublisher(e.target.value);
  };

  const handleLength = (e) => {
    setLength(e.target.value);
  };

  const handleX = () => {
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    releaseYearRef.current.value = null;
    genreRef.current.value = "";
    publisherRef.current.value = "";
    lengthRef.current.value = "";
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    const Single = {
      title : title,
      description : description,
      releaseYear : releaseYear,
      genre : genre,
      publisher : publisher,
      length : length
    };

    createSingle(Single,dispatch,navigate);
  }
  return (
    <div className="single-page-container">
      <div className="single-page-main">
        <form className="single-page-content" onSubmit={handleSubmit}>
          <div className="single-page-content-name">
            <label htmlFor="" className="single-page-content-name-label">
              {" "}
              Title :{" "}
            </label>
            <input
              ref={titleRef}
              type="text"
              className="single-page-content-name-input"
              placeholder="Nhập tên single"
              onChange={handleTitle}
            />
          </div>

          <div className="single-page-content-description">
            <label htmlFor="" className="single-page-content-description-label">
              {" "}
              Description :{" "}
            </label>
            <input
              ref={descriptionRef}
              type="text"
              className="single-page-content-description-input"
              placeholder="Nhập mô tả single "
              onChange={handleDescription}
            />
          </div>

          <div className="single-page-content-dob">
            <label htmlFor="" className="single-page-content-dob-label">
              {" "}
              Release Year :{" "}
            </label>
            <input
              ref={releaseYearRef}
              type="text"
              className="single-page-content-dob-input"
              placeholder="Nhập năm phát hành"
              onChange={handleReleaseYear}
            />
          </div>

          <div className="single-page-content-pob">
            <label htmlFor="" className="single-page-content-pob-label">
              {" "}
              Genre:{" "}
            </label>
            <input
              ref={genreRef}
              type="text"
              className="single-page-content-pob-input"
              placeholder="Nhập tên thể loại"
              onChange={handleGenre}
            />
          </div>

          <div className="single-page-content-pob">
            <label htmlFor="" className="single-page-content-pob-label">
              {" "}
              Publisher:{" "}
            </label>
            <input
              ref={publisherRef}
              type="text"
              className="single-page-content-pob-input"
              placeholder="Nhập tên nhà phát hành"
              onChange={handlePublisher}
            />
          </div>

          <div className="single-page-content-pob">
            <label htmlFor="" className="single-page-content-pob-label">
              {" "}
              Length:{" "}
            </label>
            <input
              ref={lengthRef}
              type="text"
              className="single-page-content-pob-input"
              placeholder="Nhập độ dài album"
              onChange={handleLength}
            />
          </div>

          <div className="single-page-content-">
            <button className="btn-agree">Xác nhận </button>
            <button className="btn-agree" onClick={handleX}>
              Nhập lại{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SinglePage;

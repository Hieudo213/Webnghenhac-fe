import { React, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateArtist } from "../../redux/apiRequest";
import { activateArtist } from "../../redux/apiRequest"; 
import "./ArtistItemPage.css";
function ArtistItemPage() {
  const [artist, setArtist] = useState();
  const [changePic, setChangePic] = useState(false);
  const [change, setChange] = useState(false);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dobRef = useRef(null);
  const pobRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfBirth, setBirthOfDate] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [previewAvatar, setPreviewAvatar] = useState();
  const [newfile, setNewfile] = useState(null);
  const handleX = () => {
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    dobRef.current.value = "";
    pobRef.current.value = "";
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDob = (e) => {
    setBirthOfDate(e.target.value);
  };

  const handlePob = (e) => {
    setPlaceOfBirth(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Artist = {
      name: name,
      description: description,
      dateOfBirth: dateOfBirth,
      placeOfBirth: placeOfBirth,
    };

    updateArtist(Artist, dispatch, navigate, id);
  };

  const handleChange = () => {
    if (change == false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/public/artists/${id}`)
      .then((response) => {
        setArtist(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangePic = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    return () => {
      previewAvatar && URL.revokeObjectURL(previewAvatar.preview);
    };
  }, [previewAvatar]);

  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setPreviewAvatar(file);
    setNewfile(file);
  };

  const handleUpload = (event) => {
    const formData = new FormData();
    formData.append("newfile", newfile);

    axios
      .put(
        `http://localhost:8080/api/v1/public/artists/update/picture/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleActivate = (e) => {
    e.preventDefault();
    activateArtist(dispatch,navigate,id);
  };

  return (
    <div id="artist-item-page-container">
      {artist && (
        <div className="artist-item-page-main">
          {previewAvatar ? (
            <div className="artist-item-page-picture">
              <div className="artist-item-page-img">
                <img className="artist-img-page" src={previewAvatar.preview} />
              </div>
              <form className="artist-item-page-change" onSubmit={handleUpload}>
                <input type="file" />
                <button> Tải lên </button>
                <button onClick={handleChangePic}> Huỷ </button>
              </form>
            </div>
          ) : (
            <form className="artist-item-page-picture" onSubmit={handleUpload}>
              <div className="artist-item-page-img">
                <img
                  className="artist-img-page"
                  src={
                    "http://localhost:8080/api/v1/public/pictures/file/" +
                    artist.picture.id
                  }
                />
              </div>
              <form className="artist-item-page-change">
                {changePic ? (
                  <>
                    <input type="file" onChange={handleChangeFile} />
                    <button> Tải lên </button>
                    <button onClick={handleChangePic}> Huỷ </button>
                  </>
                ) : (
                  <div className="artist-item-page-change-c">
                    <button onClick={handleChangePic}> Chỉnh sửa ảnh </button>
                  </div>
                )}
              </form>
            </form>
          )}

          {/* Infomation */}
          {change ? (
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
                <label
                  htmlFor=""
                  className="artist-page-content-description-label"
                >
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
                <button className="btn-agree" onClick={handleX}>
                  Nhập lại{" "}
                </button>
              </div>
            </form>
          ) : (
            <form className="artist-item-page-content">
              <div className="artist-item-page-content-name">
                <label
                  htmlFor=""
                  className="artist-item-page-content-name-label"
                >
                  {" "}
                  Title :{" "}
                </label>
                {artist && (
                  <span className="artist-item-page-text">{artist.name}</span>
                )}
              </div>

              <div className="artist-item-page-content-description">
                <label
                  htmlFor=""
                  className="artist-item-page-content-description-label"
                >
                  {" "}
                  Description :{" "}
                </label>
                {artist && (
                  <span className="artist-item-page-text">
                    {artist.description}
                  </span>
                )}
              </div>

              <div className="artist-item-page-content-dob">
                <label
                  htmlFor=""
                  className="artist-item-page-content-dob-label"
                >
                  {" "}
                  Place Of Birth :{" "}
                </label>
                {artist && (
                  <span className="artist-item-page-text">
                    {artist.placeOfBirth}
                  </span>
                )}
              </div>

              <div className="artist-item-page-content-pob">
                <label
                  htmlFor=""
                  className="artist-item-page-content-pob-label"
                >
                  {" "}
                  Date Of Birth :{" "}
                </label>
                {artist && (
                  <span className="artist-item-page-text">
                    {artist.dateOfBirth}
                  </span>
                )}
              </div>
            </form>
          )}
          <div className="album-item-page-content-">
            {change ? (
              <button className="btn-agree-change" onClick={handleChange}>
                Huỷ{" "}
              </button>
            ) : (
              <button className="btn-agree-change" onClick={handleChange}>
                Chỉnh sửa{" "}
              </button>
            )}
          </div>

          <form className="artist-activate" onSubmit={handleActivate}>
            <button className="album-page-artist-btn" > Active </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ArtistItemPage;

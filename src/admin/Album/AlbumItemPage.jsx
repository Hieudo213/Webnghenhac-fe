import { React, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AlbumItemPage.css";
import { useSelector, useDispatch } from "react-redux";
import { getAlbumById } from "../../redux/apiRequest";
import { updateAlbumById,updateArtistForAlbumById,activateAlbum } from "../../redux/apiRequest";
import axios from "axios";
import { act } from "react-dom/test-utils";
function AlbumItemPage() {
  const [artist,setArtist] = useState([]);
  const [artistId,setArtistId] = useState();
  const [changePic,setChangePic] = useState(false);
  let { id } = useParams();
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category,setCategory] = useState([]);
  const [categoryId,setCategoryId] = useState();
  const album = useSelector((state) => state.album.album?.Album);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState();
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const releaseYearRef = useRef(null);
  const genreRef = useRef(null);
  const publisherRef = useRef(null);
  const [previewAvatar, setPreviewAvatar] = useState();
  const [newfile, setNewfile] = useState(null);
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/artists")
      .then((response) => {
        setArtist(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/categories")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.token) {
      getAlbumById(user?.token, dispatch, id);
    }
  }, []);

  const handleChange = () => {
    if (change == false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

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

  const handleX = (e) => {
    e.preventDefault();
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    releaseYearRef.current.value = null;
    genreRef.current.value = "";
    publisherRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Album = {
      title: title,
      description: description,
      releaseYear: releaseYear,
      genre: genre,
      publisher: publisher,
      categoryId : categoryId
    };
    updateAlbumById(Album,dispatch,navigate,id);
  };

  const handleChangePic = ()=>{
    if(changePic){
      setChangePic(false);
    }else{
       setChangePic(true);
    }
  }

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
        `http://localhost:8080/api/v1/public/albums/update/picture/${id}`,
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

  const handleArtist = (e)=>{
    e.preventDefault();
    const Album = {
      artists : [
        {
        id : artistId
        }
      ]
    };
    updateArtistForAlbumById(Album,dispatch,navigate,id);
  }

  const handleActivate = (e)=>{
    e.preventDefault();
    activateAlbum(dispatch,navigate,id);
  }
  
  return (
    <div id="page-item-container">
      {album && (
        <div className="album-item-page-main">
          {previewAvatar ? (
             <div className="album-item-page-picture">
             <div className="album-item-page-img">
               <img
                 className="album-img-page"
                 src={previewAvatar.preview}
               />
             </div>
              <form className="album-item-page-change" onSubmit={handleUpload}>
               <input type="file" />
               <button> Tải lên </button>
               <button onClick = {handleChangePic}> Huỷ </button>
              </form>
           </div>
          ) :(
            <form className="album-item-page-picture" onSubmit={handleUpload}>
            <div className="album-item-page-img">
              <img
                className="album-img-page"
                src={
                  "http://localhost:8080/api/v1/public/pictures/file/" +
                  album.picture.id
                }
              />
            </div>
             <form className="album-item-page-change">
            {changePic ? (
             <>
              <input type="file"  onChange={handleChangeFile}/>
              <button> Tải lên </button>
              <button onClick = {handleChangePic}> Huỷ </button>
           </>
            ):(
              <div className="album-item-page-change-c">
              <button onClick = {handleChangePic}>  Chỉnh sửa ảnh </button>
            </div>
            )}
             </form>
            
          </form>
          )}
         

          

          {/* Infomation */}
          {change ? (
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
                <label
                  htmlFor=""
                  className="album-page-content-description-label"
                >
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

              <div className="album-page-category-id">
              <label htmlFor="" className = "label-info"> Chọn Category : </label>
              <select className="music-select" id="" onChange={(e)=>{
                setCategoryId(e.target.value)
              }}>
                {category &&
                  category.map((categories) => (
                    <option key={categories.id} value={categories.id}>
                      {categories.name}
                    </option>
                  ))}
              </select>
            </div>
          

              <div className="album-page-content-">
                <button className="btn-agree">Xác nhận </button>
                <button className="btn-agree" onClick={handleX}>Nhập lại </button>
              </div>
            </form>
          ) : (
            <form className="album-item-page-content">
              <div className="album-item-page-content-name">
                <label
                  htmlFor=""
                  className="album-item-page-content-name-label"
                >
                  {" "}
                  Title :{" "}
                </label>

                <span className="album-item-page-text">{album.title}</span>
              </div>

              <div className="album-item-page-content-description">
                <label
                  htmlFor=""
                  className="album-item-page-content-description-label"
                >
                  {" "}
                  Description :{" "}
                </label>

                <span className="album-item-page-text">
                  {album.description}
                </span>
              </div>

              <div className="album-item-page-content-dob">
                <label htmlFor="" className="album-item-page-content-dob-label">
                  {" "}
                  Release Year :{" "}
                </label>

                <span className="album-item-page-text">
                  {album.releaseYear}
                </span>
              </div>

              <div className="album-item-page-content-pob">
                <label htmlFor="" className="album-item-page-content-pob-label">
                  {" "}
                  Genre:{" "}
                </label>

                <span className="album-item-page-text">{album.genre}</span>
              </div>

              <div className="album-item-page-content-pob">
                <label htmlFor="" className="album-item-page-content-pob-label">
                  {" "}
                  Publisher:{" "}
                </label>

                <span className="album-item-page-text">{album.publisher}</span>
              </div>

              <div className="album-item-page-content-pob">
                <label htmlFor="" className="album-item-page-content-pob-label">
                  {" "}
                  Category :{" "}
                </label>

                <span className="album-item-page-text">{album.category.name}</span>
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
           {/* Artist */}

        <form action="" className="album-artist-create" onSubmit={handleArtist}>
        <div className="album-page-artist-id">
              <label htmlFor="" className = "label-info"> Chọn Artist : </label>
              <select className="music-select" id="" onChange={(e)=>{
                setArtistId(e.target.value)
              }}>
                {artist &&
                  artist.map((categories) => (
                    <option key={categories.id} value={categories.id}>
                      {categories.name}
                    </option>
                  ))}
              </select>
            </div>

            <button className="album-page-artist-btn"> Thêm </button>
        </form>

        <form className="album-activate" onSubmit={handleActivate}>
        <button className="album-page-artist-btn"> Activate </button>
        </form>

        </div>
      )}
    </div>
  );
}

export default AlbumItemPage;

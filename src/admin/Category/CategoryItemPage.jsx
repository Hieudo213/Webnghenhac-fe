import {React,useState,useEffect,useRef} from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCategory } from '../../redux/apiRequest';
function CategoryItemPage() {
  let { id } = useParams();
  const [changePic,setChangePic] = useState(false);
  const [playlist, setPlaylist] = useState();
  const [change, setChange] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewAvatar, setPreviewAvatar] = useState();
  const [newfile, setNewfile] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const Playlist = {
      name: title,
      description: description,
    };
updateCategory(Playlist,dispatch,navigate,id);
   
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
        `http://localhost:8080/api/v1/public/playlists/update/picture/${id}`,
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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/public/categories/${id}`)
      .then((response) => {
        setPlaylist(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = () => {
    if (change == false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

  const handleActivate = (e)=>{
    e.preventDefault();
   
  }
  return (
    <div className='category-id-page-container'>
        {playlist && (
      <div className="playlist-item-page-main">
        
        {previewAvatar ? (
             <div className="playlist-item-page-picture">
             <div className="playlist-item-page-img">
               <img
                 className="playlist-img-page"
                 src={previewAvatar.preview}
               />
             </div>
              <form className="playlist-item-page-change" onSubmit={handleUpload}>
               <input type="file" />
               <button> Tải lên </button>
               <button onClick = {handleChangePic}> Huỷ </button>
              </form>
           </div>
          ) :(
            <form className="playlist-item-page-picture" onSubmit={handleUpload}>
            <div className="playlist-item-page-img">
              <img
                className="playlist-img-page"
                src={
                  "http://localhost:8080/api/v1/public/pictures/file/" +
                  playlist.picture.id
                }
              />
            </div>
             <form className="playlist-item-page-change">
            {changePic ? (
             <>
              <input type="file"  onChange={handleChangeFile}/>
              <button> Tải lên </button>
              <button onClick = {handleChangePic}> Huỷ </button>
           </>
            ):(
              <div className="playlist-item-page-change-c">
              <button onClick = {handleChangePic}>  Chỉnh sửa ảnh </button>
            </div>
            )}
             </form>
            
          </form>
          )}
        

        {/* Infomation */}
        {change ? (
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
              <label
                htmlFor=""
                className="playlist-page-content-description-label"
              >
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
              <button className="btn-agree" onClick={handleX}>
                Nhập lại{" "}
              </button>
            </div>
          </form>
        ) : (
          <form className="playlist-item-page-content">
            <div className="playlist-item-page-content-name">
              <label
                htmlFor=""
                className="playlist-item-page-content-name-label"
              >
                {" "}
                Title :{" "}
              </label>
              {playlist && (
                <span className="playlist-item-page-text">
                  {playlist.name}
                </span>
              )}
            </div>

            <div className="playlist-item-page-content-description">
              <label
                htmlFor=""
                className="playlist-item-page-content-description-label"
              >
                {" "}
                Description :{" "}
              </label>
              {playlist && (
                <span className="playlist-item-page-text">
                  {playlist.description}
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

        <form action="" className="activate-playlist" onSubmit={handleActivate}>
          <button>Activate</button>
        </form>
      </div>
      )}
    </div>
  )
}

export default CategoryItemPage
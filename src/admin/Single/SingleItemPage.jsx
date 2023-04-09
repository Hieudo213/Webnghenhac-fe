import { React, useState, useEffect,useRef } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSingle,activateSingle } from "../../redux/apiRequest";
import axios from "axios";
import "./SingleItemPage.css";
function SingleItemPage() {
  const [changePic,setChangePic] = useState(false);
  const [category,setCategory] = useState([]);
  const [categoryId,setCategoryId] = useState();
  const [single, setSingle] = useState();
  const [change, setChange] = useState(false);
  let { id } = useParams();
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
  const [previewAvatar, setPreviewAvatar] = useState();
  const [newfile, setNewfile] = useState(null);

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
      length : length,
      categoryId : categoryId
    };

    updateSingle(Single,dispatch,navigate,id)
   
  }
  const handleChange = () => {
    if (change == false) {
      setChange(true);
    } else {
      setChange(false);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/public/singles/${id}`)
      .then((response) => {
        setSingle(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        `http://localhost:8080/api/v1/public/singles/update/picture/${id}`,
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
  
  const handleChangePic = ()=>{
    if(changePic){
      setChangePic(false);
    }else{
       setChangePic(true);
    }
  }

  const handleActivate = (e)=>{
    e.preventDefault();
    activateSingle(dispatch,navigate,id);
  }
  
  return (
    <div id="single-item-page-container">
      {single&&(
      <div className="single-item-page-main">
        
        {previewAvatar ? (
             <div className="single-item-page-picture">
             <div className="single-item-page-img">
               <img
                 className="single-img-page"
                 src={previewAvatar.preview}
               />
             </div>
              <form className="single-item-page-change" onSubmit={handleUpload}>
               <input type="file" />
               <button> Tải lên </button>
               <button onClick = {handleChangePic}> Huỷ </button>
              </form>
           </div>
          ) :(
            <form className="single-item-page-picture" onSubmit={handleUpload}>
            
            <div className="single-item-page-img">
              <img
                className="single-img-page"
                src={
                  "http://localhost:8080/api/v1/public/pictures/file/" +
                  single.picture.id
                }
              />
            </div>
             <form className="single-item-page-change">
            {changePic ? (
             <>
              <input type="file"  onChange={handleChangeFile}/>
              <button> Tải lên </button>
              <button onClick = {handleChangePic}> Huỷ </button>
           </>
            ):(
              <div className="single-item-page-change-c">
              <button onClick = {handleChangePic}>  Chỉnh sửa ảnh </button>
            </div>
            )}
             </form>
            
          </form>
          )}
        
      
        {/* Infomation */}
        {change ? (
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

         <div className="single-page-content-">
           <button className="btn-agree">Xác nhận </button>
           <button className="btn-agree" onClick={handleX}>
             Nhập lại{" "}
           </button>
         </div>
       </form>
        ):
        (
          <form className="single-item-page-content">
          <div className="single-item-page-content-name">
            <label htmlFor="" className="single-item-page-content-name-label">
              {" "}
              Title :{" "}
            </label>
            {single && (
              <span className="single-item-page-text">{single.title}</span>
            )}
          </div>

          <div className="single-item-page-content-description">
            <label
              htmlFor=""
              className="single-item-page-content-description-label"
            >
              {" "}
              Description :{" "}
            </label>
            {single && (
              <span className="single-item-page-text">{single.description}</span>
            )}
          </div>

          <div className="single-item-page-content-dob">
            <label htmlFor="" className="single-item-page-content-dob-label">
              {" "}
              Release Year :{" "}
            </label>
            {single && (
              <span className="single-item-page-text">{single.releaseYear}</span>
            )}
          </div>

          <div className="single-item-page-content-pob">
            <label htmlFor="" className="single-item-page-content-pob-label">
              {" "}
              Genre :{" "}
            </label>
            {single && (
              <span className="single-item-page-text">{single.genre}</span>
            )}
          </div>

          <div className="single-item-page-content-pob">
            <label htmlFor="" className="single-item-page-content-pob-label">
              {" "}
              Publisher :{" "}
            </label>
            {single && (
              <span className="single-item-page-text">{single.publisher}</span>
            )}
          </div>

          <div className="single-item-page-content-pob">
            <label htmlFor="" className="single-item-page-content-pob-label">
              {" "}
              Length :{" "}
            </label>
            {single && (
              <span className="single-item-page-text">{single.length}</span>
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
        <form action="" className="activate-single">
        <button className="activate-single" onClick={handleActivate}>Activate</button>
        </form>
      </div>
      )}
    </div>
  );
}

export default SingleItemPage;

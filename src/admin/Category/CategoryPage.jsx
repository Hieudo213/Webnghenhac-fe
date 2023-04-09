import {React,useState,useEffect,useRef} from 'react'
import "./CategoryPage.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCategory } from '../../redux/apiRequest';
function CategoryPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleTitle = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleX = () => {
    nameRef.current.value = "";
    descriptionRef.current.value = "";

  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    const Category = {
      name : name,
      description : description,
    };

   createCategory(Category,dispatch,navigate);
  }
  return (
    <div className='category-page-container'>
       <div className="category-page-main">
        <form className="category-page-content" onSubmit={handleSubmit}>
          <div className="category-page-content-name">
            <label htmlFor="" className="category-page-content-name-label">
              {" "}
              Title :{" "}
            </label>
            <input
              ref={nameRef}
              type="text"
              className="category-page-content-name-input"
              placeholder="Nhập tên category"
              onChange={handleTitle}
            />
          </div>

          <div className="category-page-content-description">
            <label htmlFor="" className="category-page-content-description-label">
              {" "}
              Description :{" "}
            </label>
            <input
              ref={descriptionRef}
              type="text"
              className="category-page-content-description-input"
              placeholder="Nhập mô tả category "
              onChange={handleDescription}
            />
          </div>

          
          <div className="category-page-content-">
            <button className="btn-agree">Xác nhận </button>
            <button className="btn-agree" onClick={handleX}>Nhập lại </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryPage
import './Genre.css'
import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
export default function Genre(){
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios
          .get("http://localhost:8080/api/v1/public/categories")
          .then((response) => {
            console.log(response);
            setCategories(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    return(
       <div id='container'>
       <div className='header'>
            <div className='header_title'>
                <h1 className='header_title_text'>
                  Genre
                </h1>
            </div>
        </div>
        <div className='Body'>
            <div className='category'>
               {categories&&categories.map(category =>(
                 <Link className='category-main' key={category.id} to={`/genre/${category.id}`}>
                    <div className='category-img'>
                    <img
                className="category-img-content"
                src={
                  "http://localhost:8080/api/v1/public/pictures/file/" +
                  category.picture.id
                }
                
              />
                        <div className='category-main-title'>{category.name}</div>
                    </div>
                    
                </Link>
               ))}
            </div>
        </div>
       </div>
    )
}
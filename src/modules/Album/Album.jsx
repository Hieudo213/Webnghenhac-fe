import './Album.css'
import axios from 'axios'
import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
export default function Album() {
const[inProcessAlbum,setInProcessAlbum] = useState([]);
const [doneAlbum,setDoneAlbum] = useState([]);
useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/albums/admin/in-process/all")
      .then((response) => {
        setInProcessAlbum(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/albums/admin/done/all")
      .then((response) => {
        setDoneAlbum(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
    return (
        <div id='container'>
            <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                       In process Albums
                    </h1>
                </div>

            </div>
            <div className="body">
                <div className="contents">
                {inProcessAlbum&&inProcessAlbum.map(album=>(
                    <Link to={`/admin/album/${album.id}`} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="album-img-content-admin"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                          album.picture.id
                        }
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {album.title}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>

            <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                      Done Albums
                    </h1>
                </div>

            </div>

            <div className="body">
                <div className="contents">
                {doneAlbum&&doneAlbum.map(album=>(
                    <Link to={`/admin/album/${album.id}`} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="album-img-content-admin"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                          album.picture.id
                        }
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {album.title}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>


        </div>
    )
}
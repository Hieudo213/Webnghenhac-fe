import {React,useState,useEffect} from 'react'
import axios from 'axios' 
import { Link } from 'react-router-dom';
function Single() {
    const [inProcessSingles,setInProcessSingles] = useState([]);
    const [doneSingle,setDoneSingle] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8080/api/v1/public/singles/admin/in-process/all")
          .then((response) => {
           setInProcessSingles(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      
      useEffect(() => {
        axios
          .get("http://localhost:8080/api/v1/public/singles/admin/done/all")
          .then((response) => {
           setDoneSingle(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
  return (
    <div>
        <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                      In Progress Singles 
                    </h1>
                </div>

            </div>
            <div className="body">
                <div className="contents">
                {inProcessSingles&&inProcessSingles.map(singles=>(
                    <Link to={`/admin/single/${singles.id}`} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="album-img-content-admin"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                         singles.picture.id
                        }
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {singles.title}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>

            <div className='header'>
                <div className='header_title'>
                    <h1 className='header_title_text'>
                        Singles are not activated
                    </h1>
                </div>

            </div>

            <div className="body">
                <div className="contents">
                {doneSingle&&doneSingle.map(singles=>(
                    <Link to={`/admin/single/${singles.id}`} className='contents-main'>

                    <div className='contents-img'>
                    <img
                        className="album-img-content-admin"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                         singles.picture.id
                        }
                      />
                    </div>
                    <div className='contents-img-name'>
                        <div className='NAME-img'>
                            {singles.title}
                        </div>
                    </div>
                </Link> 
                ))}
                   
                </div>
            </div>
    </div>
  )
}

export default Single
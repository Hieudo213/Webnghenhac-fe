import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Search.css";
import { getAllSingles } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function Search(props) {
  const dispatch = useDispatch();
  const [singles, setSingles] = useState([]);
  const search = useSelector((state) => state.single.singles?.Singles);

  useEffect(() => {
    getAllSingles(dispatch);
    setSingles(
      search.filter((m) => {
        if(m===null){
          return;
        }
        return m.title.includes(props.inputText);
      })
    );
  }, [props.inputText]);
  return (
    <div id="search-container">
      {singles.length === 0 ? (
        <div className="bad-result-search">
          <div className="bad-result-search-message">
            Không có kết quả tìm kiếm
          </div>
        </div>
      ) : (
        singles.map((single) => (
          <Link
            className="search-main"
            key={single.id}
            to={`/single/${single.id}`}
          >
            <div className="single-picture">
              <div className="single-picture-content">
                <img
                  className="single-img-content"
                  src={
                    "http://localhost:8080/api/v1/public/pictures/file/" +
                    single.picture.id
                  }
                />
              </div>
            </div>
            <div className="single-infomation">
              <div className="single-info">
                <div className="single-title">{single.title}</div>
                <div className="single-album">
                  {single.songs.map((song) => (
                    <>
                      {song.album.title} -{" "}
                      {song.artists.map((artist) => (
                        <>{artist.name}</>
                      ))}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Search;

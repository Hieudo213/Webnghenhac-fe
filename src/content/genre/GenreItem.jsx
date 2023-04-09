import { React, useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./GenreItem.css";
import { getGenreById } from "../../redux/apiRequest";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function GenreItem() {
  let { id } = useParams();
  const [albums,setAlbums] = useState([]);
  const [singles,setSingles] = useState([]);
  const [playlists,setPlaylists] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const genre = useSelector((state) => state.genre.genre?.Genre);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.token) {
      getGenreById(user?.token, dispatch, id);
    }
  }, []);

  console.log(genre);

  return (
    <div id="container">
      {genre && (
        <>
          <div className="genre-header">
            <div className="genre-header_title">
              <h1 className="genre-header_title_text">{genre.name}</h1>
            </div>
          </div>
          <div className="genre-Body">
           
            <div className="small-content">
              <div className="small-content-title">
                <h1 className="small-content-title-text">
                 Albums
                </h1>
              </div>
              {/* Album */}
              <div className="small-content-list">
                {genre &&
                  genre.albums.map((album) => (
                    <Link
                      className="list_contents-main"
                      key={album.id}
                      to={`/album/${album.id}`}
                    >
                      <div className="list_contents-img">
                        <img
                          className="playlist-img-content"
                          src={
                            "http://localhost:8080/api/v1/public/pictures/file/" +
                           album.picture.id
                          }
                        />
                      </div>
                      <div className="list_contents-img-name">
                        <div className="list_contents-img-name-content">
                          {album.title}
                        </div>
                      </div>
                      <div className="list_contents-genre">{genre.name}</div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Single */}

            <div className="small-content">
              <div className="small-content-title">
                <h1 className="small-content-title-text">
                 Singles
                </h1>
              </div>
              <div className="small-content-list">
                {genre &&
                  genre.singles.map((single) => (
                    <Link
                      className="list_contents-main"
                      key={single.id}
                      to={`/single/${single.id}`}
                    >
                      <div className="list_contents-img">
                        <img
                          className="playlist-img-content"
                          src={
                            "http://localhost:8080/api/v1/public/pictures/file/" +
                            single.picture.id
                          }
                        />
                      </div>
                      <div className="list_contents-img-name">
                        <div className="list_contents-img-name-content">
                          {single.title}
                        </div>
                      </div>
                      <div className="list_contents-genre">{genre.name}</div>
                    </Link>
                  ))}
              </div>
            </div>
            <div className="small-content">
              <div className="small-content-title">
                <h1 className="small-content-title-text">
                 Playlists
                </h1>
              </div>
              <div className="small-content-list">
                {genre &&
                  genre.playlists.map((playlist) => (
                    <Link
                      className="list_contents-main"
                      key={playlist.id}
                      to={`/playlist/${playlist.id}`}
                    >
                      <div className="list_contents-img">
                        <img
                          className="playlist-img-content"
                          src={
                            "http://localhost:8080/api/v1/public/pictures/file/" +
                            playlist.picture.id
                          }
                        />
                      </div>
                      <div className="list_contents-img-name">
                        <div className="list_contents-img-name-content">
                          {playlist.title}
                        </div>
                      </div>
                      <div className="list_contents-genre">{genre.name}</div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GenreItem;

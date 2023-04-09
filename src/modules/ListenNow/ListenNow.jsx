import "./ListenNow.css";
import { React, useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ListenNow() {
  const [listenNow, setListenNow] = useState([]);
  const [singles, setSingles] = useState([]);
  const user = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/albums")
      .then((response) => {
        setListenNow(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/singles")
      .then((response) => {
        setSingles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  return (
    <div id="container">
      <div className="header">
        <div className="header_title">
          <h1 className="header_title_text">Listen Now</h1>
        </div>
        {user ? (
          <div></div>
        ) : (
         <Link to={"/login"} className="header-login">
            <h1>Đăng Nhập</h1>
          </Link>
        )}
      </div>
      <div className="Body">
        {/* Top picks */}
        <div className="Top-picks">
          <div className="Top-picks_title">Top Picks</div>
          <div className="Top-picks_contents">
            {listenNow &&
              listenNow.map((listenNows) => (
                <div className="render-albums" key={listenNows.id}>
                  <Link
                    className="Top-picks_contents-main"
                    to={`/album/${listenNows.id}`}
                  >
                    <div className="Top-picks_contents-title">
                      <span className="Top-picks_contents-title-text">
                        {listenNows.publisher}
                      </span>
                    </div>
                    <div className="Top-picks_contents-img">
                      <img
                        className="album-img-content"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                          listenNows.picture.id
                        }
                      />
                    </div>
                    <div className="Top-picks_contents-img-name">
                      <div className="NAME-img">{listenNows.title}</div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        {/* recently added */}

        <div className="recently-added">
          <div className="recently-added-title">Recently Added</div>
          <div className="recently-added_contents">
            {singles &&
              singles.map((single) => (
                <Link
                  className="recently-added_contents-main"
                  key={single.id}
                  to={`/single/${single.id}`}
                >
                  <div className="recently-added_contents-img">
                    <div className="img">
                      <img
                        className="single-img-content"
                        src={
                          "http://localhost:8080/api/v1/public/pictures/file/" +
                          single.picture.id
                        }
                      />
                    </div>
                  </div>
                  <div className="recently-added_contents-img-name">
                    <div className="recently-added_NAME-img">
                      {single.title}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

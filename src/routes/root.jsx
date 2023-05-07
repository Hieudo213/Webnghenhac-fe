import "./root.css";
import { useState,useRef} from "react";
import { Outlet, Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import Header from "../modules/Header/Header";
import { MusicProvider } from "../context/MusicContext";
import Search from "../modules/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
export default function Root() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const ref = useRef(null);
  const [text,setText] = useState("");
  const [isSearch,setIsSearch] = useState(false)
  const handleSearch = (e)=>{
    setText(e.target.value);
    setIsSearch(true);
  }
  const handleXButton = ()=>{
    setIsSearch(false);
    ref.current.value = '';
  }
  console.log(user);
  return (
    <div className="App">
      <MusicProvider>
        <div id="header" >
          <Header />
        </div>


        <div id="sideBar">
          {/* Logo */}
          <div className="sideBar_logo"></div>

          {/* search */}
          <div className="sideBar_search">
            <div className="sideBar_search-main">
              <div className="icon">
                <SearchIcon className="icon-main" />
              </div>
              <input ref={ref} className="search-input" placeholder="Search" onChange={handleSearch} />

            </div>
            {isSearch ? ( <div className="search-content">
               <Search inputText = {text}/>
            </div>) : (<div></div>)}
            {isSearch ? (<FontAwesomeIcon className="x-icon" icon={faCircleXmark} onClick={handleXButton}/>) : (<></>) }
            
          </div>

          {/* Text 1 */}
          <div className="sideBar-text">
            <span className="sideBar-text-content">Aape Music</span>
          </div>

          {/* Sidebar Content  */}
          <div className="sideBar-content">
            <div className="sidebar-text">
              <Link className="Link" to={`listennow`}>Listen now</Link>
            </div>
            <div className="sidebar-text">
              <Link className="Link" to={`browse`}>Browse</Link>
            </div>
            <div className="sidebar-text">
              <Link className="Link" to={`genre`}>Genre</Link>
            </div>

            <div className="sidebar-text">
              <Link className="Link" to={`artists`}>Artists</Link>
            </div>
            {
              user?.role == "ADMIN" ? (<>
              <div className="sidebar-text">
              <Link className="Link" to={`admin/page`}>Admin</Link>
            </div>
              </>):(<></>)
            }
            

          </div>

          
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </MusicProvider>
    </div>
  );
}

import { React, useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faX, faWrench } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletedUserById, updateRoleById } from "../../redux/apiRequest";
import axios from 'axios';
import './UserList.css'
function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [curUser, setCurUser] = useState()
  const [update, setUpdate] = useState(false);
  const [change, setChange] = useState(false);
  const roles = [
    {
      id : 0,
      name : "Default"
    },
    {
      id: 1,
      name: "ADMIN"
    },
    {
      id: 2,
      name: "USER"
    }
  ];
  const [roleName, setRoleName] = useState("");
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/public/users")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accounts]);

  const handleChange = () => {
    if (update) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  }

  const handleUpdate = (account) => {
    if (change) {
      setChange(false);
    } else {
      setUserId(account.id);
      setCurUser(account);
      setChange(true);
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deletedUserById(dispatch, navigate, userId);
    setChange(false);
    setUpdate(false);
  }

  const handleCheck = (e) => {
    e.preventDefault();
    updateRoleById(roleName, dispatch, navigate, userId);
    setChange(false);
    setUpdate(false);
  }
  return (
    <div id='user-container'>
      <div className="user-content">
        <div className="user-title">
          <div className="user-tag">Firstname</div>
          <div className="user-tag">Email</div>
          <div className="user-tag">Avatar</div>
          <div className="user-tag">Role</div>
          <div className="user-tag">
            {
              update ? (<>
              <button className='user-btn' onClick={handleChange}>Huỷ</button>
              </>) :
              (
                <>
                <button className='user-btn' onClick={handleChange}>Chỉnh sửa</button>
                </>
              )
            }
           
          </div>
        </div>
        <div className='user-list'>
          {
            accounts && accounts.map((account) => (
              <div key={account.id} className='user-main'>
                <div className="user-main-tag"><label htmlFor="" className='user-main-label'>{account.id}.</label>
                  <span className='user-infomation'>{account.firstname}</span>
                </div>
                <div className="user-main-tag">
                  <span className='user-infomation'>{account.email}</span>
                </div>
                <div className="user-main-tag">
                  <div className="user-img">
                    <img
                      className="user-img-content"
                      src={
                        "http://localhost:8080/api/v1/public/pictures/file/" +
                        account.picture.id
                      }
                    />
                  </div>
                </div>
                {update ? (<>
                  <div className="user-main-tag">
                    <select className="music-select" id="" onChange={(e) => {
                      setRoleName(e.target.value);
                    }}>
                      {roles &&
                        roles.map((role) => (
                          <option key={role.id} value={role.name}>
                            {role.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="user-main-tag" onClick={() => handleUpdate(account)}>
                    {
                      change == true && curUser.id == account.id ? (<> <FontAwesomeIcon className='user-icon' size="lg" icon={faCheck}
                        onClick={handleCheck} />
                        <FontAwesomeIcon className='user-icon' size="lg" icon={faTrash} onClick={handleDelete} />
                        <FontAwesomeIcon className='user-icon' size="lg" icon={faX} /></>) : (<> <FontAwesomeIcon className='user-icon' size="lg" icon={faWrench} /></>)
                    }

                  </div>



                </>)
                  :
                  (<>
                    <div className="user-main-tag">{account.role}</div>
                    <div className="user-main-tag">

                    </div>
                  </>)
                }

              </div>
            )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UserList
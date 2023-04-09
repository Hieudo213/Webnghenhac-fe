import { React, useState, useEffect } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserById } from "../../redux/apiRequest";
import axios from "axios";
function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [change, setChange] = useState(false);
  const [changePicture, setChangePicture] = useState(false);
  const [avatar, setAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [newfile, setNewfile] = useState(null);
  const handleChangePicture=(e)=>{
    e.preventDefault();
    setChangePicture(true)
  }
  const handleChange = () => {
    setChange(true);
  };

  const hanleCancel = (e) => {
    e.preventDefault();
    setChange(false);
    setChangePicture(false)
    setPreviewAvatar(null)
  };

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const handleLastname = (e) => {
    setLastname(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstname: firstname,
      lastname: lastname,
    };
    updateUserById(newUser, dispatch, user.id, navigate);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/public/users/${user.id}`)
      .then((response) => {
        setAvatar(response.data);
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
      .post(
        `http://localhost:8080/api/v1/public/users/update/picture/${user.id}`,
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
  return (
    <div id="account-container">
      <div className="account-title">
        <h1 className="account-title-text">Thông tin tài khoản</h1>
        <h1 className="account-password"> Đổi mật khẩu </h1>
      </div>

      {previewAvatar ? (
        <div className="account-avatar">
          <div className="account-avatar-main">
            <div className="account-avatar-main-content">
              <img
                src={previewAvatar.preview}
                alt=""
                className="account-avatar-img"
              />
            </div>
          </div>
          <form className="account-change" onSubmit={handleUpload}>
            <input type="file" id="avatar-upload" onChange={handleChangeFile} />
            <button type="submit">Tải lên</button>
            <button onClick={hanleCancel}>Huy</button>
          </form>
        </div>
      ) : (
        <div className="account-avatar">
          <div className="account-avatar-main">
            <div className="account-avatar-main-content">
              <img
                src={`http://localhost:8080/api/v1/public/pictures/file/${avatar?.picture.id}`}
                alt=""
                className="account-avatar-img"
              />
            </div>
          </div>
          <form className="account-change" onSubmit={handleUpload}>
            {changePicture ? (
              <>
                <input
                  type="file"
                  id="avatar-upload"
                  onChange={handleChangeFile}
                />
                <button type="submit">Tải lên</button>
                <button onClick={hanleCancel}>Huy</button>
              </>
            ) : (
              <>
                <button onClick={handleChangePicture}>Thay doi avatar cua ban </button>
               
              </>
            )}
          </form>
        </div>
      )}

      {change ? (
        <form className="account-main" onSubmit={handleSubmit}>
          <div className="account-id">
            <div className="account-id-text">
              Id : <span className="account-id-text-content">{user.id}</span>
            </div>
          </div>
          <div className="account-email">
            <div className="account-email-text">
              Email :{" "}
              <span className="account-email-text-content">{user.email}</span>
            </div>
          </div>
          <div className="account-firstname-input">
            <label className="account-firstname-input-label">
              Firstname :{" "}
            </label>
            <input
              type="text"
              className="account-firstname-input-text"
              placeholder="Nhập firstname"
              onChange={handleFirstname}
            />
          </div>
          <div className="account-lastname-input">
            <label className="account-firstname-input-label">Lastname : </label>
            <input
              type="text"
              className="account-firstname-input-text"
              placeholder="Nhập lastname"
              onChange={handleLastname}
            />
          </div>
          <div className="account-submit">
            <button className="account-submit-button">Thay đổi</button>
            <button className="account-submit-button" onClick={hanleCancel}>
              Huỷ
            </button>
          </div>
        </form>
      ) : (
        <div className="account-main">
          <div className="account-id">
            <div className="account-id-text">
              Id : <span className="account-id-text-content">{user.id}</span>
            </div>
          </div>
          <div className="account-email">
            <div className="account-email-text">
              Email :{" "}
              <span className="account-email-text-content">{user.email}</span>
            </div>
          </div>
          <div className="account-firstname">
            <div className="account-firstname-text">
              Firstname :{" "}
              <span className="account-firstname-text-content">
                {user.firstname}
              </span>
            </div>
          </div>
          <div className="account-lastname">
            <div className="account-lastname-text">
              Lastname :{" "}
              <span className="account-lastname-text-content">
                {user.lastname}
              </span>
            </div>
          </div>
          <div className="account-submit">
            <button className="account-submit-button" onClick={handleChange}>
              Thay đổi thông tin tài khoản
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;

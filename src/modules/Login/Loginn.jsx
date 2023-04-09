import { React, useState } from "react";
import "./Loginn.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const checkedFrom = useSelector((state) => state.auth.login.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    
    loginUser(newUser, dispatch, navigate);
  };
  return (
    <div id="loginn-container">
      <div className="loginn-form">
        <form className="form" onSubmit={handleLogin}>
          <div className="form-title">Login</div>
          <div className="form-username">
            <input
              className="email-input-text"
              type="text"
              placeholder="Email"
              onChange={handleEmail}
            />
          </div>
          <div className="form-password">
            <input
              className="password-input-text"
              type="password"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>
          <div className="register-link">
            {checkedFrom ? (
              <div className="loginError">
                * Tài khoản hoặc mật khẩu sai, vui lòng đăng nhập lại{" "}
              </div>
            ) : (
              <div></div>
            )}

            <Link to={"/register"} className="register-link-main">
              Sign up
            </Link>
          </div>

          <div className="form-button">
            <button className="loginn-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

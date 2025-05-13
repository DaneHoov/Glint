import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { RiCameraLensAiFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">
          <RiCameraLensAiFill size={40} />
          <h2 className="login-slogan">See the world!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.credential && <p className="error">{errors.credential}</p>}
          <button type="submit">Log In</button>
          <p className="signup-link">
            Don’t have an account? <a href="/signup">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiCameraLensAiFill } from "react-icons/ri"; // Import the icon
import { Link } from "react-router-dom"; // Import Link for navigation
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  if (sessionUser)
    return <Navigate to={`/users/${sessionUser.id}`} replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }

    if (password !== confirmPassword) {
      setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
  };

  const isFormIncomplete =
    !email ||
    !username ||
    !firstName ||
    !lastName ||
    !password ||
    !confirmPassword;

  return (
    <>
      <div className="signup-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="icon-container">
            <RiCameraLensAiFill size={40} />
          </div>
          <h1>Sign up for Glint</h1>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          {errors.email && <p>{errors.email}</p>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          {errors.username && <p>{errors.username}</p>}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
          {errors.firstName && <p>{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          {errors.lastName && <p>{errors.lastName}</p>}
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p>{errors.password}</p>}
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <div className="submit-container">
            <button type="submit" disabled={isFormIncomplete}>
              Sign Up
            </button>
          </div>
          <div className="separator">
            <hr />
            <p>
              Already a Glint member? <Link to="/login">Log in here</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormPage;

/* eslint-disable react/no-unescaped-entities */
// Signin component
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import '../assets/App.css'

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin({ email, password }))
      .unwrap()
      .then((data) => {
        if (data.status) {
          // Lưu token vào cookie thay vì localStorage
          document.cookie = `token=${data.token}; max-age=${60 * 60 * 1000}; path=/`; // 1 hour
          navigate("/home");
        } else {
          console.log(data.message); // Xử lý thông báo lỗi nếu cần
        }
      })
      .catch((error) => {
        console.error("Failed to sign in:", error);
      });
  };

  return (
    <div className="background-primary">
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {status === "loading" ? "Loading..." : "Sign In"}
                </button>
                {status === "failed" && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
              </form>
              <div className="mt-3 text-center">
                <Link to="/forgotPassword">Forgot Password?</Link>
              </div>
              <div className="mt-2 text-center">
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signin;

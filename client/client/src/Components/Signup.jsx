import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../Store/authSlice';
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../assets/App.css'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ username, email, password })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled' && action.payload.status) {
        navigate('/signin');
      }
      console.log(action);
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="background-primary">
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
            
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="********"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                  {status === 'failed' && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {error}
                    </div>
                  )}
                  <p>Have an account? <Link to='/signin'>Sign In</Link></p>
                </form>
              </div>
              </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;

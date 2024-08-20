import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../Store/authSlice';
import { useNavigate } from "react-router-dom";
import '../assets/App.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        alert("Check your email for reset password link");
        navigate("/signin");
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
          <form className="card p-4" onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>

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

            <button type="submit" className="btn btn-primary">Send</button>
            {status === 'failed' && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;

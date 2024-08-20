import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../Store/authSlice';
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../assets/App.css'

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
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
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="********"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Reset</button>
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
    </div>
    </div>
  );
};

export default ResetPassword;

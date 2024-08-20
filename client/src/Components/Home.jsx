import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/App.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/signin');
      }
      console.log(action);
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="container mt-5">
      <h1>Home</h1>
      <button className="btn btn-primary me-3"><Link to="/dashboard" className="text-white text-decoration-none">Dashboard</Link></button>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      {status === 'failed' && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Home;

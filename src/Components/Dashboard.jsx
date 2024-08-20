import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../Store/authSlice';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verify()).then((action) => {
      if (action.meta.requestStatus !== 'fulfilled') {
        navigate('/home');
      }
      console.log(action);
    }).catch(err => {
      console.log(err);
    });
  }, [dispatch, navigate]);

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      {status === 'succeeded' && user && (
        <div className="mt-4">
          <p className="lead">Welcome, {user.username}!</p>
        </div>
      )}
      {status === 'failed' && (
        <div className="alert alert-danger mt-3" role="alert">
          Access Denied!
        </div>
      )}
    </div>
  );
};

export default Dashboard;

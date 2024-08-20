import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../Store/authSlice';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(verify()).unwrap();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Component /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;

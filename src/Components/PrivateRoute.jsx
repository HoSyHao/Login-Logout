import { Navigate } from "react-router-dom";

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};

const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = getCookie('token');
    console.log('Token:', token); // Kiểm tra giá trị token
    console.log('All cookies:', document.cookie);

    return token ? <Component {...rest} /> : <Navigate to="/signin" replace />;
};


export default PrivateRoute;

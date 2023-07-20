import React, { useContext } from 'react';
import { AuthContext } from '../Context/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    const location = useLocation()
    if (loader) {
        return <h3>Loading</h3>
    }

    if (user) {
        return children;
    }
    else {
        return (
            <Navigate to="/login" state={{ from: location }} replace ></Navigate>
        );
    }

};

export default PrivateRoute;
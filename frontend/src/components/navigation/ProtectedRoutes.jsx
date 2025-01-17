import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const token = localStorage.getItem('token');

    if(token) return children;
    else return <Navigate to='/signin' />
}

export default ProtectedRoutes
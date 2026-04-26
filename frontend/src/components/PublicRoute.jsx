import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
    const { user } = useAuth()

    return (
        user ? <Navigate to="/" />  : <Outlet /> 
    )
}

export default PublicRoute



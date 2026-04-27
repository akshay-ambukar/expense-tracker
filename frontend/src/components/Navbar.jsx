import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { user,   logout } = useAuth();

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <nav className='bg-gray-900 flex items-center py-4 px-7 text-white justify-between'>
            <div className="logo">
                <p className='text-xl font-bold'>Expense Tracker</p>
            </div>

            <div className="flex items-center justify-between gap-14">
                <Link
                    to="/"
                    className="hover:text-blue-400 transition-colors cursor-pointer text-[17px]"
                >
                    Home
                </Link>

                <Link
                    to="/history"
                    className="hover:text-blue-400 transition-colors cursor-pointer text-[17px]"
                >
                    History
                </Link>

                <Link
                    to="/dashboard"
                    className="hover:text-blue-400 transition-colors cursor-pointer text-[17px]"
                >
                    Dashboard
                </Link>

            </div>

            <div className="flex items-center gap-4">
                <p className='text-sm text-gray-300'>
                    👤 {user?.name}
                </p>

                <div className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                    <button onClick={handleLogout} className='cursor-pointer'>
                        Logout
                    </button>
                </div>
            </div>


        </nav>
    )
}

export default Navbar

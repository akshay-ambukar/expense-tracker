import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink  } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <nav className='bg-gray-900 flex items-center px-2 md:px-7 py-3 md:py-4 text-white justify-between'>
            <div className="logo">
                <p className='text-md md:text-xl font-bold'>Expense Tracker</p>
            </div>

            <div className="hidden md:flex md:items-center md:justify-between gap-2 md:gap-14">
                <NavLink
                    to="/"                    
                    className={({ isActive }) =>
                        `hover:text-blue-500 transition-colors cursor-pointer text-[17px] ${isActive
                            ? " text-blue-500 font-semibold"
                            : "text-gray-400 font-semibold hover:underline "
                        }`
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `hover:text-blue-500 transition-colors cursor-pointer text-[17px] ${isActive
                            ? " text-blue-500 font-semibold"
                            : "text-gray-400 font-semibold hover:underline "
                        }`
                    }
                >
                    History
                </NavLink>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `hover:text-blue-500 transition-colors cursor-pointer text-[17px] ${isActive
                            ? " text-blue-500 font-semibold"
                            : "text-gray-400 font-semibold hover:underline "
                        }`
                    }
                >
                    Dashboard
                </NavLink>

            </div>

            <div className="flex items-center gap-4">
                <p className='hidden md:text-sm md:text-gray-300'>
                    👤 {user?.name}
                </p>

                <div className="text-[12px] md:text-[15px] md:font-medium px-2 md:px-4 py-1 md:py-2 bg-red-500 rounded-md md:rounded-lg hover:bg-red-600 transition-colors">
                    <button onClick={handleLogout} className='cursor-pointer'>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

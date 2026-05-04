import React from 'react'
import { NavLink } from 'react-router-dom'

const SecNav = () => {
    return (
        <div className='bg-slate-800 text-white text-[10px] h-6 flex justify-around items-center md:hidden'>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `hover:text-blue-500 transition-colors cursor-pointer text-[13px] ${isActive
                        ? " text-blue-500 font-semibold"
                        : "text-gray-400 font-semibold hover:underline "
                    }`
                }>
                Home
            </NavLink>
            <NavLink
                to="/history"
                className={({ isActive }) =>
                    `hover:text-blue-500 transition-colors cursor-pointer text-[13px] ${isActive
                        ? " text-blue-500 font-semibold"
                        : "text-gray-400 font-semibold hover:underline "
                    }`
                }>
                History
            </NavLink>
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `hover:text-blue-500 transition-colors cursor-pointer text-[13px] ${isActive
                        ? " text-blue-500 font-semibold"
                        : "text-gray-400 font-semibold hover:underline "
                    }`
                }>
                Dashboard
            </NavLink>
        </div>
    )
}

export default SecNav

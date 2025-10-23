import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {

    return (
        <div className='navbar-list-container'>
            {/* title */}
            <h1>Fitness Application</h1>
            {/* links */}
            <div className='navbar'>
                <ul className='navbar-list'>
                    <li>
                        <NavLink
                            to='/calculator'
                            end
                            className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
                        >
                            Calculator
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/workout'
                            end
                            className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}

                        >
                            Workout Finder
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/recipe'
                            end
                            className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
                        >
                            Recipe Ideas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/nutrition'
                            end
                            className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
                        >
                            Nutrition Facts
                        </NavLink>
                    </li>
                </ul>

                <div className="navbar-profile">
                    <NavLink to='/login' className='navbar-login-link'>Login</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar

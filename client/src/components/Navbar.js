import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
const Navbar = ({ session }) => {
    console.log(session)
    return (
        <nav>
            {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarunAuth />}
        </nav>
    )
}


const NavbarunAuth = () => (
    <ul>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/signin">SignIn</NavLink>
        </li>
        <li>
            <NavLink to="/signup">Signup</NavLink>
        </li>
    </ul>
);

const NavbarAuth = ({ session }) => (

    <Fragment>
        {console.log(session)}
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
            <li>
                <NavLink to="/recipe/add">Add Recipe</NavLink>
            </li>
            <li>
                <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
                <button>Signout</button>
            </li>
        </ul>
        <h2>Welcome,<strong>{session.getCurrentUser.username}</strong></h2>
    </Fragment>
);

export default Navbar

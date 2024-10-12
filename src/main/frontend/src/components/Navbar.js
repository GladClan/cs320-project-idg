import './Navbar.css';
import DropdownMenu from './DropdownMenu';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <DropdownMenu titles={["Profile", "Character", "Creatures", "Logout"]} links={["/Profile", "Character", "Creatures", ""]}/>
                <Link className='link' to="/Home">Home</Link>
            </div>
        </nav>
    );
}

export default Navbar;
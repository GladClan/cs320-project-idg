import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={"navbar"}>
            <div>
                <Link to="/">Greeting</Link>
                <span>{/*Get rid of this when properly formatted*/"  "}</span>
                <Link to="/Home">Home</Link>
            </div>
        </nav>
    );
}

export default Navbar;
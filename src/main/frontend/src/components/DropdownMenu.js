import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';

function DropdownMenu({titles, links}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">Pages</button>
            {isOpen && (
                <div className="dropdown-content">
                    {titles.map((title, index) => (
                        <Link key={index} to={links[index]} onClick={closeDropdown}>
                            {title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
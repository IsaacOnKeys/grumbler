import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgMenuGridR } from 'react-icons/cg';


function Header() {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const menuItems = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'Add Post',
            path: '/addpost'
        },
        {
            title: 'Shares',
            path: '/shares'
        },
        {
            title: 'Profile',
            path: '/profile'
        }
    ];

    return (
        <div className="p-5 bg-primary rounded">
            {!showMenu && (
                <div className="md:flex justify-end  mr-5 hidden bg-primary  -mb-7">
                    <CgMenuGridR size={32} color='white' className="cursor-pointer" onClick={() => setShowMenu(true)} />
                </div>
            )}

            <div className="flex items-center justify-between ">
                <h1 className="text-2xl text-white grumbler-head">Grumbler :(</h1>

                {/* Web View */}
                <div className="flex space-x-10 justify-end items-center md:hidden">
                    {menuItems.map((item) => {
                        return (
                            <Link
                                to={`${item.path}`} className={`text-primary-darker ${item.path === location.pathname && "bg-white text-primary-black rounded p-[.5ch]"}`}
                                onClick={() => setShowMenu(false)}>
                                {item.title}
                            </Link>
                        );
                    })}
                    <h1
                        className='text-primary-darker cursor-pointer'
                        onClick={() => {
                            localStorage.removeItem('grumper.user')
                            navigate('/login')
                        }}>Logout
                    </h1>
                </div>

                {/* Mobile view */}
                {showMenu && (
                    <div className="md:flex space-x-10 justify-end flex-col items-end space-y-[1.5ch] hidden">
                        {menuItems.map((item) => {
                            return (
                                <Link
                                    to={`${item.path}`}
                                    className={`text-primary-darker ${item.path === location.pathname && "bg-white text-primary-black rounded p-[.5ch]"}`} >
                                    {item.title}
                                </Link>
                            );
                        })}
                        <h1
                            className='text-primary-darker cursor-pointer'
                            onClick={() => {
                                localStorage.removeItem('grumper.user')
                                navigate('/login')
                            }}>Logout
                        </h1>
                    </div>
                )}
            </div>


        </div>
    )
};

export default Header 
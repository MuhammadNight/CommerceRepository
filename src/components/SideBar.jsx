import { BiHeart } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { FaBlog } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { FiFileText } from "react-icons/fi";
import { TiHomeOutline } from "react-icons/ti";
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, setScreenSize } from '../store/slices/pageActions';

const Sidebar = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.pageActions.showSidebar);

    useEffect(() => {
        const handleResize = () => {
            dispatch(setScreenSize(window.innerWidth));
        };


        window.addEventListener('resize', handleResize);


        handleResize();


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

    return (
        <div
            className={`z-10 fixed top-0 left-0 w-64 h-full bg-white shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="flex flex-col h-full p-4">
                <button
                    className="self-end text-2xl"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <AiOutlineClose />
                </button>
                <nav className="flex flex-col flex-1 mt-4">
                    <NavLink
                        to="/"
                        className="text-xl py-2 px-4"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <div className="flex justify-start items-center gap-[20px]">
                            <span><TiHomeOutline /></span>
                            Home
                        </div>
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="text-xl py-2 px-4"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <div className="flex justify-start items-center gap-[20px]">
                            <span><FiFileText /></span>
                            About
                        </div>
                    </NavLink>
                    <NavLink
                        to="/contact-us"
                        className="text-xl py-2 px-4"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <div className="flex justify-start items-center gap-[20px]">
                            <span><GrContact /></span>
                            Contact Us
                        </div>
                    </NavLink>
                    <NavLink
                        to="/blog"
                        className="text-xl py-2 px-4"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <div className="flex justify-start items-center gap-[20px]">
                            <span><FaBlog /></span>
                            Blog
                        </div>
                    </NavLink>
                    <NavLink
                        to="/Favourite"
                        className="text-xl py-2 px-4"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <div className="flex justify-start items-center gap-[20px]">
                            <span><BiHeart /></span>
                            Favourite
                        </div>
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className="text-xl py-2 px-4"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <div className="flex justify-start items-center gap-[20px]">
                            <span><RiShoppingCartLine /></span>
                            Cart
                        </div>
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className="text-xl py-2 px-4"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <div className="flex justify-start items-center gap-[20px]">
                            <span><AiOutlineUser /></span>
                            Profile
                        </div>
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;

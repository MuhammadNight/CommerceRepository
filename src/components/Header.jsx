import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineMenu, AiOutlineCamera, AiOutlineHeart } from 'react-icons/ai';
import Logo from '../images/logos/logo.png';
import { toggleSidebar } from '../store/slices/pageActions';
import { SiYoutubegaming } from 'react-icons/si';
import { BsHeadphones, BsPhone, BsSmartwatch } from 'react-icons/bs';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import Sidebar from './SideBar';
import { createSlug } from '../utils/createSlug';

const Header = () => {
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.pageActions.showSidebar);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        axios.get('https://commercebase.onrender.com/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setDropdownVisible(true);

        if (value) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    };

    const handleProductClick = () => {
        setSearchTerm('');
        setDropdownVisible(false);
    };

    return (
        <header className="bg-white relative">
            <Sidebar isOpen={isSidebarOpen} />

            <div className="flex justify-between md:justify-between items-center px-[20px] py-[20px] md:px-[160px] md:py-4 mx-auto">
                <NavLink to="/" className="flex-shrink-0">
                    <img src={Logo} alt="Cyber Logo" className="w-24 h-7 cursor-pointer" />
                </NavLink>


                <div className="relative flex-1 mx-8 mt-4 md:mt-0 flex items-center">
                    <AiOutlineSearch className="absolute left-3 text-[23px] text-[#989898]" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search"
                        className="bg-gray-200 rounded-md p-2 pl-10 w-full"
                    />
                    {dropdownVisible && filteredProducts.length > 0 && (
                        <div ref={dropdownRef} className="absolute top-12 left-0 bg-white border border-gray-200 w-full rounded-md shadow-lg z-10 max-h-[400px] overflow-y-auto">
                            <ul className="py-2">
                                {filteredProducts.map(product => {
                                    const slug = createSlug(product.name, product.id);
                                    let linkPath = '/';

                                    switch (product.CategoryId) {
                                        case 1:
                                            linkPath = `/phones/${slug}`;
                                            break;
                                        case 5:
                                            linkPath = `/computers/${slug}`;
                                            break;
                                        case 2:
                                            linkPath = `/smartwatches/${slug}`;
                                            break;
                                        case 3:
                                            linkPath = `/cameras/${slug}`;
                                            break;
                                        case 4:
                                            linkPath = `/headphones/${slug}`;
                                            break;
                                        case 6:
                                            linkPath = `/gaming/${slug}`;
                                            break;
                                        default:
                                            linkPath = `/`;
                                    }

                                    return (
                                        <li key={product.id} className="px-4 py-2 hover:bg-gray-100">
                                            <NavLink to={linkPath} onClick={handleProductClick}>
                                                <div className='flex justify-start items-center gap-[20px]'>
                                                    <img className='w-12 h-12 object-contain' src={product.imageUrl} alt={product.name} />
                                                    {product.name}
                                                </div>
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>

                <nav className="text-gray-400 hidden sm:hidden md:hidden lg:flex">
                    <div className="flex space-x-8 text-nowrap">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${isActive ? 'text-gray-800' : ''} hover:text-gray-800 transition-colors`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `${isActive ? 'text-gray-800' : ''} hover:text-gray-800 transition-colors`
                            }
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/contact-us"
                            className={({ isActive }) =>
                                `${isActive ? 'text-gray-800' : ''} hover:text-gray-800 transition-colors`
                            }
                        >
                            Contact Us
                        </NavLink>
                        <NavLink
                            to="/blog"
                            className={({ isActive }) =>
                                `${isActive ? 'text-gray-800' : ''} hover:text-gray-800 transition-colors`
                            }
                        >
                            Blog
                        </NavLink>
                    </div>
                </nav>

                <div className="text-[#000000] space-x-4 text-[20px] ml-8 mt-4 md:mt-0 hidden lg:flex md:hidden">
                    <button className="hover:text-[#2e2e2e] transition-colors">
                        <NavLink to="/favourite">
                            <AiOutlineHeart />
                        </NavLink>
                    </button>
                    <button className="hover:text-[#2e2e2e] transition-colors">
                        <NavLink to="/cart">
                            <AiOutlineShoppingCart />
                        </NavLink>
                    </button>
                    <button className="hover:text-[#2e2e2e] transition-colors">
                        <NavLink to="/profile">
                            <AiOutlineUser />
                        </NavLink>
                    </button>
                </div>
                <button
                    className="md:block lg:hidden text-[20px] ml-4 mt-4"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <AiOutlineMenu />
                </button>
            </div>


            <div className="bg-[#2e2e2e] text-[#979797] hidden lg:flex">
                <div className="flex justify-between space-x-4 p-2 px-[100px] py-[8px] mx-auto max-w-[1400px]">
                    <NavLink
                        to="/phones"
                        className={({ isActive }) =>
                            `${isActive ? 'text-white' : ''} hover:text-white flex gap-2 items-center text-[17px] transition-colors`
                        }
                    >
                        <BsPhone />
                        Phones
                    </NavLink>
                    <span className="block w-[1px] h-[20px] bg-gray-400 mx-2"></span>
                    <NavLink
                        to="/computers"
                        className={({ isActive }) =>
                            `${isActive ? 'text-white' : ''} hover:text-white flex gap-2 items-center text-[17px] transition-colors`
                        }
                    >
                        <HiOutlineDesktopComputer />
                        Computers
                    </NavLink>
                    <span className="block w-[1px] h-[20px] bg-gray-400 mx-2"></span>
                    <NavLink
                        to="/smartwatches"
                        className={({ isActive }) =>
                            `${isActive ? 'text-white' : ''} hover:text-white flex gap-2 items-center text-[17px] transition-colors`
                        }
                    >
                        <BsSmartwatch />
                        Smart Watches
                    </NavLink>
                    <span className="block w-[1px] h-[20px] bg-gray-400 mx-2"></span>
                    <NavLink
                        to="/cameras"
                        className={({ isActive }) =>
                            `${isActive ? 'text-white' : ''} hover:text-white flex gap-2 items-center text-[17px] transition-colors`
                        }
                    >
                        <AiOutlineCamera />
                        Cameras
                    </NavLink>
                    <span className="block w-[1px] h-[20px] bg-gray-400 mx-2"></span>
                    <NavLink
                        to="/headphones"
                        className={({ isActive }) =>
                            `${isActive ? 'text-white' : ''} hover:text-white flex gap-2 items-center text-[17px] transition-colors`
                        }
                    >
                        <BsHeadphones />
                        Headphones
                    </NavLink>
                    <span className="block w-[1px] h-[20px] bg-gray-400 mx-2"></span>
                    <NavLink
                        to="/gaming"
                        className={({ isActive }) =>
                            `${isActive ? 'text-white' : ''} hover:text-white flex gap-2 items-center text-[17px] transition-colors`
                        }
                    >
                        <SiYoutubegaming />
                        Gaming
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;

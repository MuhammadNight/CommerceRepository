import React, { useRef } from 'react';
import { AiOutlineFileImage, AiOutlineCamera } from 'react-icons/ai';
import { GiSmartphone } from 'react-icons/gi';
import { BsHeadphones, BsSmartwatch } from 'react-icons/bs';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { SiYoutubegaming } from 'react-icons/si';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NewCard from '../components/pageComp/NewCard';
import BestCard from '../components/pageComp/BestCard';

const Home = () => {
    const [activeTab, setActiveTab] = React.useState('newArrivals');
    const dispatch = useDispatch();
    const { products, isProductLoad } = useSelector(state => state.product);


    const categoryRef = useRef(null);

    const scrollLeft = () => {
        if (categoryRef.current) {
            categoryRef.current.scrollBy({
                left: -categoryRef.current.offsetWidth / 2,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (categoryRef.current) {
            categoryRef.current.scrollBy({
                left: categoryRef.current.offsetWidth / 2,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className='overflow-x-auto'>
            <div className="bg-[#211C24] pb-[80px]">
                <div className="px-4 mx-auto max-w-screen-xl flex flex-col lg:flex-row items-center lg:justify-between">

                    <div className="flex-1 text-center px-[50px] lg:text-left">
                        <h1 className="text-[25px] leading-[32px] font-semibold text-[#7a777c] pt-[40px] lg:pt-[100px]">
                            Pro.Beyond.
                        </h1>
                        <h1 className="text-white text-[40px] lg:text-[60px] font-semibold leading-[48px] lg:leading-[72px] mt-4">
                            IPhone 14 <span className="font-semibold">Pro</span>
                        </h1>
                        <h6 className="text-[#919191] text-[14px] lg:text-[18px] font-medium mt-4">
                            Created to change everything for the better. For everyone
                        </h6>
                        <Link to={"/phones/iphone-14-pro-1"}>
                            <button className="border-[1px] w-[150px] lg:w-[174px] h-[40px] lg:h-[46px] mt-4 text-[14px] lg:text-[18px] font-medium text-white rounded-md hover:border-gray-700 hover:text-gray-700 active:scale-95 duration-150">
                                Shop Now
                            </button>
                        </Link>
                    </div>

                    <div className="flex-1 mt-8 lg:mt-0 flex justify-center items-center translate-y-[80px]">
                        <img className="w-full max-w-[456px] h-auto lg:max-w-[456px] lg:h-[630px]" src="https://i.ibb.co/p425b1R/Home-image.png" alt="Home" />
                    </div>
                </div>
            </div>

            <div className="px-4 mx-auto max-w-screen-xl py-12 lg:py-20">
                <div className="flex justify-between items-center">
                    <span className="text-[18px] lg:text-[24px] font-semibold">Browse By Category</span>
                    <div className="flex gap-4 text-[18px] lg:text-[20px]">
                        <span className="cursor-pointer" onClick={scrollLeft}><SlArrowLeft /></span>
                        <span className="cursor-pointer" onClick={scrollRight}><SlArrowRight /></span>
                    </div>
                </div>
                <div className="relative mt-8 lg:mt-12 overflow-x-auto">
                    <div
                        ref={categoryRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth snap-x pb-4"
                        style={{ scrollPaddingLeft: '16px', scrollPaddingRight: '16px' }}
                    >
                        <NavLink to="/phones" className="flex-shrink-0">
                            <div className="flex w-[140px] sm:w-[180px] h-[120px] sm:h-[148px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col snap-start">
                                <span className="text-[26px] sm:text-[32px] lg:text-[42px] mb-2"><GiSmartphone /></span>
                                <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium">Phones</span>
                            </div>
                        </NavLink>
                        <NavLink to="/computers" className="flex-shrink-0">
                            <div className="flex w-[140px] sm:w-[180px] h-[120px] sm:h-[148px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col snap-start">
                                <span className="text-[26px] sm:text-[32px] lg:text-[42px] mb-2"><HiOutlineDesktopComputer /></span>
                                <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium">Computers</span>
                            </div>
                        </NavLink>
                        <NavLink to="/smartwatches" className="flex-shrink-0">
                            <div className="flex w-[140px] sm:w-[180px] h-[120px] sm:h-[148px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col snap-start">
                                <span className="text-[26px] sm:text-[32px] lg:text-[42px] mb-2"><BsSmartwatch /></span>
                                <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium">Smartwatches</span>
                            </div>
                        </NavLink>
                        <NavLink to="/cameras" className="flex-shrink-0">
                            <div className="flex w-[140px] sm:w-[180px] h-[120px] sm:h-[148px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col snap-start">
                                <span className="text-[26px] sm:text-[32px] lg:text-[42px] mb-2"><AiOutlineCamera /></span>
                                <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium">Cameras</span>
                            </div>
                        </NavLink>
                        <NavLink to="/headphones" className="flex-shrink-0">
                            <div className="flex w-[140px] sm:w-[180px] h-[120px] sm:h-[148px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col snap-start">
                                <span className="text-[26px] sm:text-[32px] lg:text-[42px] mb-2"><BsHeadphones /></span>
                                <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium">Headphones</span>
                            </div>
                        </NavLink>
                        <NavLink to="/gaming" className="flex-shrink-0">
                            <div className="flex w-[140px] sm:w-[180px] h-[120px] sm:h-[148px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col snap-start">
                                <span className="text-[26px] sm:text-[32px] lg:text-[42px] mb-2"><SiYoutubegaming /></span>
                                <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium">Gaming</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="px-4 mx-auto max-w-screen-xl py-12 lg:py-20">
                <div className="flex gap-6 mb-8 lg:gap-8 lg:mb-12">

                    <span
                        className={`cursor-pointer text-[16px] lg:text-[18px] font-medium ${activeTab === 'newArrivals' ? 'border-b-2 border-black' : ''}`}
                        onClick={() => setActiveTab('newArrivals')}
                    >
                        New Arrivals
                    </span>

                    <span
                        className={`cursor-pointer text-[16px] lg:text-[18px] font-medium ${activeTab === 'bestsellers' ? 'border-b-2 border-black' : ''}`}
                        onClick={() => setActiveTab('bestsellers')}
                    >
                        Bestsellers
                    </span>

                </div>

                {isProductLoad ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-6">
                        {Array(8).fill().map((_, index) => (
                            <div key={index} className="bg-gray-300 w-full h-[300px] lg:h-[432px] animate-pulse">
                                <span className="text-[60px] lg:text-[114px] flex justify-center items-center translate-y-[130px]">
                                    <AiOutlineFileImage />
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-6">
                        {activeTab === 'newArrivals' ? (
                            products.map(item => (
                                <NewCard key={item.id} item={item} />
                            ))
                        ) : (
                            products.map(item => (
                                <BestCard key={item.id} item={item} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

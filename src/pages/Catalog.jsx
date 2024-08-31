import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { BsHeadphones, BsSmartwatch } from 'react-icons/bs'
import { GiSmartphone } from 'react-icons/gi'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import { SiYoutubegaming } from 'react-icons/si'
import { NavLink } from 'react-router-dom'

const Catalog = () => {
    return (
        <div className="mx-8 my-8">
            <div className="text-lg ml-8 font-medium mb-[50px]"><NavLink className={"opacity-55"} to={"/"}>{"Home  >  "}</NavLink><NavLink to={"/catalog"}>Catalog</NavLink></div>
            <span className="text-[18px] mx-8 my-8 lg:text-[24px] font-semibold">Browse By Category</span>
            <div className="grid mx-8 my-8 lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-4 mt-[30px]">
                <NavLink to="/phones">
                    <div className="flex w-[140px] h-[108px] md:w-[150px] md:h-[118px] lg:w-[160px] lg:h-[128px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col">
                        <span className="text-[30px] lg:text-[40px] mb-2"><GiSmartphone /></span>
                        <span className="text-[14px] lg:text-[16px] font-medium">Phones</span>
                    </div>
                </NavLink>
                <NavLink to="/computers">
                    <div className="flex w-[140px] h-[108px] md:w-[150px] md:h-[118px] lg:w-[160px] lg:h-[128px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col">
                        <span className="text-[30px] lg:text-[40px] mb-2"><HiOutlineDesktopComputer /></span>
                        <span className="text-[14px] lg:text-[16px] font-medium">Computers</span>
                    </div>
                </NavLink>
                <NavLink to="/smartwatches">
                    <div className="flex w-[140px] h-[108px] md:w-[150px] md:h-[118px] lg:w-[160px] lg:h-[128px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col">
                        <span className="text-[30px] lg:text-[40px] mb-2"><BsSmartwatch /></span>
                        <span className="text-[14px] lg:text-[16px] font-medium">Smartwatches</span>
                    </div>
                </NavLink>
                <NavLink to="/cameras">
                    <div className="flex w-[140px] h-[108px] md:w-[150px] md:h-[118px] lg:w-[160px] lg:h-[128px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col">
                        <span className="text-[30px] lg:text-[40px] mb-2"><AiOutlineCamera /></span>
                        <span className="text-[14px] lg:text-[16px] font-medium">Cameras</span>
                    </div>
                </NavLink>
                <NavLink to="/headphones">
                    <div className="flex w-[140px] h-[108px] md:w-[150px] md:h-[118px] lg:w-[160px] lg:h-[128px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col">
                        <span className="text-[30px] lg:text-[40px] mb-2"><BsHeadphones /></span>
                        <span className="text-[14px] lg:text-[16px] font-medium">Headphones</span>
                    </div>
                </NavLink>
                <NavLink to="/gaming">
                    <div className="flex w-[140px] h-[108px] md:w-[150px] md:h-[118px] lg:w-[160px] lg:h-[128px] bg-[#EDEDED] rounded-md hover:bg-gray-300 cursor-pointer duration-200 active:scale-95 p-4 shadow-md justify-center items-center flex-col">
                        <span className="text-[30px] lg:text-[40px] mb-2"><SiYoutubegaming /></span>
                        <span className="text-[14px] lg:text-[16px] font-medium">Gaming</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Catalog

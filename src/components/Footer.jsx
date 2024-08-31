import React from 'react';
import { FaTiktok } from 'react-icons/fa';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { CgFacebook } from 'react-icons/cg';
import logo from '../images/logos/logo_footer.png';

const Footer = () => {
  return (
    <div className="bg-black px-4 py-8 text-white md:px-8 lg:px-24 lg:py-16">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:text-start md:text-start text-center">
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <img className="w-24 h-7 mb-6" src={logo} alt="Logo" />
          <p className="text-sm lg:text-base font-medium">
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
          </p>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row lg:ml-[350px] lg:flex lg:gap-12 lg:w-2/3">
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg lg:text-xl font-semibold mb-2">Services</h2>
            <ul className="space-y-2">
              <li className="text-sm cursor-pointer">Bonus program</li>
              <li className="text-sm cursor-pointer">Gift cards</li>
              <li className="text-sm cursor-pointer">Credit and payment</li>
              <li className="text-sm cursor-pointer">Service contacts</li>
              <li className="text-sm cursor-pointer">Non cash account</li>
              <li className="text-sm cursor-pointer">Payment</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-semibold mb-2">Assistance to the buyer</h2>
            <ul className="space-y-2">
              <li className="text-sm cursor-pointer">Find an order</li>
              <li className="text-sm cursor-pointer">Exchange and return of goods</li>
              <li className="text-sm cursor-pointer">Guarantee</li>
              <li className="text-sm cursor-pointer">Frequently asked questions</li>
              <li className="text-sm cursor-pointer">Terms of use the site</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-white flex justify-center gap-6 text-xl mt-6 lg:justify-start lg:gap-8 lg:text-2xl">
        <span className="cursor-pointer"><AiOutlineTwitter /></span>
        <span className="cursor-pointer"><CgFacebook /></span>
        <span className="cursor-pointer"><FaTiktok /></span>
        <span className="cursor-pointer"><AiFillInstagram /></span>
      </div>
    </div>
  );
};

export default Footer;

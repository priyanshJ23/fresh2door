import React from "react";
import footer from "../assets/footer1.png";
import {
  TiSocialFacebook,
  TiSocialPinterest,
  TiSocialTwitter,
} from "react-icons/ti";
import {
  BsInstagram,
} from "react-icons/bs";

const Footer = () => {
  return (
    <div className="w-3/4 mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm font-light mt-4 p-2">
        <div className="flex flex-col">
          <p className="text-green-500 text-lg font-semibold">Fresh2Door</p>
          <a href="/about" className="text-gray-600 hover:text-gray-900 transition duration-300">About Us</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition duration-300">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition duration-300">Affiliate</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition duration-300">Terms and Conditions</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900 transition duration-300">Careers At Fresh2door</a>
        </div>
        <div className="flex flex-col">
          <p className="text-green-500 text-lg font-semibold">Help</p>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition duration-300">FAQ's</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900 transition duration-300">Contact Us</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition duration-300">Vendor Connect</a>
        </div>
        <div className="flex flex-col">
          <p className="text-green-500 text-lg font-semibold">Download Our App</p>
          <div>
            <img src="https://www.bbassets.com/static/v2557/custPage/build/content/img/Google-App-store-icon.png" alt="" />
          </div>
          <div>
            <img src="https://www.bbassets.com/static/v2557/custPage/build/content/img/Apple-App-store-icon.png" alt="" />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-green-500 text-lg font-semibold">Get Social With Us</p>
          <div className="flex">
            <div className="bg-blue-700 w-10 h-10 rounded-full flex justify-center items-center mr-4">
              <TiSocialFacebook color="white" size={"40px"} />
            </div>
            <div className="bg-red-600 w-10 h-10 rounded-full flex justify-center items-center mr-4">
              <TiSocialPinterest color="white" size={"40px"} />
            </div>
            <div className="bg-blue-500 w-10 h-10 rounded-full flex justify-center items-center mr-4">
              <TiSocialTwitter color="white" size={"40px"} />
            </div>
            <div className="bg-blue-800 w-10 h-10 rounded-full flex justify-center items-center mr-4">
              <BsInstagram color="white" size={"25px"} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-2">
        <p className="text-green-500 text-lg mr-4 font-semibold">Payment Options</p>
        <div>
          <img src={footer} alt="" className="transform scale-50" />
        </div>
      </div>
    </div>
  );
};

export default Footer;

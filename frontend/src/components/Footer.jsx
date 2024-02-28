import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10 flex justify-between items-center">
      <div className="leftFooter w-1/4 text-right">
        <h4 className="font-semibold text-lg">Get New Updates</h4>
        <div className="subscribe-container">
          <input
            type="email"
            placeholder="Enter your Email*"
            className="w-full py-2 px-3 bg-transparent border-b-2 border-gray-500 text-black focus:border-green-500 outline-none"
          />
          <button className="bg-green-500 text-white py-2 px-4 mt-2 rounded hover:bg-green-700 transition-colors duration-300">Subscribe</button>
        </div>
        <p className="text-sm mt-2">Stay informed with our latest news and exclusive content.</p>
      </div>

      <div className="midFooter w-1/2 text-center">
        <h1 className="text-4xl font-bold">Fresh2door</h1>
        <p className="text-lg">Anywhere, Anytime</p>
        <p className="text-sm mt-2">© 2023 All Rights Reserved.</p>
        <h4 className="text-lg mt-4">Follow Us</h4>
        <div className="social-icons mt-2">
          <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-700">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-700">
            <i className="fab fa-github"></i>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-700">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="rightFooter w-1/4">
        <h4 className="font-semibold text-lg text-right" style={{ paddingRight: "200px" }}>Our Location</h4>
        <p className="text-lg">Fresh2door Pvt. Ltd., 456, Business Avenue, Connaught Place, New Delhi, Delhi</p>
      </div>
    </footer>
  );
};

export default Footer;

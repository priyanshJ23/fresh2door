import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10 flex justify-between items-center">
      <div className="midFooter w-1/2 text-center">
        <h1 className="text-4xl font-bold">Fresh2door</h1>
        <p className="text-lg">Anywhere, Anytime</p>
        <p className="text-sm mt-2">© 2023 All Rights Reserved.</p>
        <h4 className="text-lg mt-4">Follow Us</h4>
        <div className="social-icons mt-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-700">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-700">
            <i className="fab fa-github"></i>
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-700">
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

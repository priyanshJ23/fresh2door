import React, { useState} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Signup = ({ setShowSignup, setShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleLoginClick = () => {
    setShowSignup(false); // Close Signup modal
    setShowLogin(true); // Show Login modal
  };

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch("https://fresh2door-2.onrender.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responseData = await fetchData.json();
        toast(responseData.message);
        if (responseData.message) {
          setShowSignup(false); // Close Signup modal
          setShowLogin(true); // Show Login modal
        }
      } else {
        alert("Passwords do not match.");
      }
    } else {
      alert("All fields are required.");
    }
  };
  // const toggleModal = () => {
  //   setShowModal((prevShowModal) => !prevShowModal);
  // }

  
  return (
    <>
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative p-4 w-full max-w-md">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-white-600">
                <h3 className="text-xl font-semibold text-white-900 dark:text-green">
                  Welcome to Fresh2door
                </h3>
                <button
                  onClick={() => setShowSignup(false)}
                  type="button"
                  className="end-2.5 text-white-400 bg-transparent hover:bg-white-200 hover:text-white-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-white-600 dark:hover:text-green"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Form fields */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-green-900 dark:text-green"
                    >
                      First Name :
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-600 dark:border-green-500 dark:placeholder-gray-400 dark:text-gray"
                      placeholder="First Name"
                      value={data.firstName}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-green-900 dark:text-green"
                    >
                      Last Name :
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-600 dark:border-green-500 dark:placeholder-gray-400 dark:text-gray"
                      placeholder="Last Name"
                      value={data.lastName}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-green-900 dark:text-green"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-600 dark:border-green-500 dark:placeholder-gray-400 dark:text-gray"
                      placeholder="name@company.com"
                      value={data.email}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-green-900 dark:text-green"
                    >
                      Password
                    </label>
                    <div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-600 dark:border-green-500 dark:placeholder-gray-400 dark:text-gray"
                        placeholder="********"
                        value={data.password}
                        onChange={handleOnChange}
                        required
                      />
                      <span
                        className="flex items-center text-xl cursor-pointer"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="#374151"
                          className="h-6 w-6 text-white-600 dark:text-white-400"
                          >
                            <path
                                     fillRule="evenodd"
                                     d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.293-4.293a1 1 0 0 1 1.414-1.414l1.09 1.09A3.993 3.993 0 0 1 10 15a4 4 0 1 1-1.707-3.293l1.09-1.09a1 1 0 0 1 1.414 1.414l-1.646 1.646a1 1 0 0 1-1.414 0l-1.646-1.646a1 1 0 0 1 0-1.414z"
                                     clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="#374151"
                          className="h-6 w-6 text-white-600 dark:text-white-400"
                          >
                            <path
                                  fillRule="evenodd"
                                  d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0-2a8 8 0 1 0 0 16A8 8 0 0 0 10 2z"
                                  clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-green-900 dark:text-green"
                    >
                      Confirm Password
                    </label>
                    <div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-600 dark:border-green-500 dark:placeholder-gray-400 dark:text-gray"
                        placeholder="********"
                        value={data.confirmPassword}
                        onChange={handleOnChange}
                        required
                      />
                      <span
                        className="flex items-center text-xl cursor-pointer"
                        onClick={handleShowConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-6 w-6 text-white-600 dark:text-white-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.293-4.293a1 1 0 0 1 1.414-1.414l1.09 1.09A3.993 3.993 0 0 1 10 15a4 4 0 1 1-1.707-3.293l1.09-1.09a1 1 0 0 1 1.414 1.414l-1.646 1.646a1 1 0 0 1-1.414 0l-1.646-1.646a1 1 0 0 1 0-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-6 w-6 text-white-600 dark:text-white-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0-2a8 8 0 1 0 0 16A8 8 0 0 0 10 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                 <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Sign Up
                  </button>
                  {/* Login Link */}
                  <div className="text-sm font-medium text-white-500 dark:text-white-300">
                    Already a member?{" "}
                    <button
                      type="button"
                      onClick={handleLoginClick}
                      className="text-blue-700 hover:underline dark:text-green-500"
                    >
                      Login first
                    </button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  );
  }  

  export default Signup;
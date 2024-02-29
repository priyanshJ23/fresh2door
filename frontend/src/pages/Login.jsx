import React, { useState, useEffect } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import { useAuth } from '../components/Authcontext';
const Login =({ setShowLogin, setShowSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);


  useEffect(() => {
    setShowLogin(true); // Set showLogin to true when Login modal is mounted
  }, [setShowLogin]); // Include setShowLogin in the dependency array
  

  const handleSignupClick = () => {
    setShowSignup(true); // Set showSignup to true to show Signup modal
    setShowLogin(false); // Set showLogin to false to hide Login modal
  };
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
//   const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };


 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch('https://fresh2door-2.onrender.com/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message);

      if (dataRes.alert) {
        login();
        setShowLogin(false);
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <>
      {setShowLogin && (
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
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-green">
                  Sign in to our platform
                </h3>
                <button
                  onClick={() => setShowLogin(false)}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-green"
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
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-green-900 dark:text-green"
                    >
                      Email:
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
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-green-900 dark:text-green"
                    >
                      Password:
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white-600 dark:border-green-500 dark:placeholder-gray-400 dark:text-gray"
                      required
                      value={data.password}
                      onChange={handleOnChange}
                    />
                    <span
                      className="flex text-xl cursor-pointer"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <BiShow /> : <BiHide />}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Login
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{' '}
                    <button
                      onClick={handleSignupClick}
                      className="text-green-700 hover:underline dark:text-green-500"
                    >
                      Create account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSignupModal && <Signup setShowSignup={setShowSignupModal} setShowLogin={setShowLogin} />}
    </>
  );
};

export default Login;

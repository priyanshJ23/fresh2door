import React, { useState, useContext , createContext} from 'react';
import { Link } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { FaMotorcycle } from 'react-icons/fa'; // Import the delivery scooter guy icon
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Authcontext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
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
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}> 
      
          <label htmlFor="name">Name: </label>
          <input
            type="name"
            name="name"
            id="name"
            className="w-full bg-slate-200 px-2 py-1 rounded mt-1 mb-2 outline-none green-border" // Apply green border
            //onChange={(e) => setUsername(e.target.value)} 
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full bg-slate-200 px-2 py-1 rounded mt-1 mb-2 outline-none green-border" // Apply green border
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password: </label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline-none green-border"> {/* Apply green border */}
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className="w-full bg-slate-200 border-none outline-none"
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

          <button
            type="submit"
            className="max-w-[120px] w-full bg-green-500 hover:bg-green-600 cursor-pointer m-auto text-white
            text-xl font-medium text-center py-1 rounded-full mt-4" // Apply green color to the button
          >
            Login
          </button>
        </form>
        </div>
        <p className="text-left text-sm mt-2">
          Don't have an account?{' '}
          <Link to={'/signup'} className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}


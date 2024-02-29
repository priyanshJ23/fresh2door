import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RiLoader3Line } from "react-icons/ri";
import { MdMyLocation } from "react-icons/md";
import toast from "react-hot-toast";
import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import { useAuth } from '../components/Authcontext';
import Login from "../pages/Login";
import Signup from "../pages/Signup";
function Header() {
  const { isLoggedIn } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { logout } = useAuth();
  const handleLoginClick = () => {
    setShowLogin(true);
    console.log(setShowLogin);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };
  const handleShowMenu = () => {
    setShowMenu((prevState) => !prevState);
  };
 
  const handleLogout = () => {
    logout();
  };

  const handleNewProduct = () => {
    console.log(userData.email);
    if (userData.email === "fresh2dooradmin@gmail.com") {
      navigate("/newproduct");
    } else {
      toast("You are not authorized to access this feature(Admin Features)");
    }
  };

  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };
    let latlong = await navLocation().then((res) => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude];
    });
    let [lat, long] = latlong;
    const response = await fetch(
      "https://fresh2door-2.onrender.com/getlocation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latlong: { lat, long } }),
      }
    );
    const { location } = await response.json();
    setAddress(location);
    setLoading(false);
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      toast("Please log in first");
    }
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed w-full h-16 shadow-md px-2 md:px-4 z-50 bg-white">
      {/* desktop version */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-12 flex items-center md:text-lg font-bold font-sans">
            <h1 className="text-xl">
              <span style={{ color: "green" }}>Fresh</span>
              <span style={{ color: "red" }}>2</span>
              <span style={{ color: "green" }}>Door</span>
            </h1>
          </div>
        </Link>
        <div className="flex items-center">
          <button
            onClick={handleClick}
            disabled={loading}
            className="flex items-center"
          >
            {loading ? (
              <RiLoader3Line className="animate-spin mr-2" />
            ) : (
              <MdMyLocation className="mr-2" />
            )}
            {loading
              ? "Detecting your location..."
              : address || "Detect your location"}
          </button>
        </div>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className=" gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""} className="hover:text-slate-700">
              Home
            </Link>
            <Link
              to={"menu/64380e5a3117eade68edec54"}
              className="hover:text-slate-700"
            >
              Menu
            </Link>
            <Link to={"about"} className="hover:text-slate-700">
              About
            </Link>
            <Link to={"contact"} className="hover:text-slate-700">
              Contact
            </Link>
          </nav>
          <div className="text-2xl relative cursor-pointer">
            <div onClick={handleCartClick}>
              <CiShoppingCart />
              <div className="absolute -top-1 -right-1 text-white bg-black h-4 w-4  rounded-full m-0 pb-.1  text-sm text-center flex justify-center items-center">
                {cartItemNumber.length}
              </div>
            </div>
          </div>
          {isLoggedIn ? (
    <div className="flex items-center gap-4 md:gap-7">
    <div className="relative">
      <button className="text-green-700" onClick={handleShowMenu}>
       {userData.firstName ? `Hi, ${userData.firstName}` : 'Hi, User'}
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <button className="block px-4 py-2 text-green-800 hover:bg-green-200 w-full text-left" onClick={handleNewProduct}>
            New product
          </button>
          <button className="block px-4 py-2 text-green-800 hover:bg-green-200 w-full text-left" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
) : (
  <>
    <button
      onClick={handleLoginClick}
      className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      type="button"
    >
      Login
    </button>
    {showLogin && <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />} {/* Pass setShowLogin and setShowSignup to Login component */}
    {showSignup && <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} />} {/* Pass setShowSignup and setShowLogin to Signup component */}
  </>
)}

        </div>
      </div>
      {/* mobile version */}
    </header>
  );
}

export default Header;

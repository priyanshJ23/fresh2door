import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RiLoader3Line } from 'react-icons/ri';
import { MdMyLocation } from 'react-icons/md';
import { useAuth } from '../components/Authcontext';
import toast from 'react-hot-toast';
import { useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const { isLoggedIn } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu(prevState => !prevState)
  }

  const handleLogout = () => {
    // Redirect to the login page
    navigate('/login');
  }

  const handleNewProduct = () => {
    console.log(userData.email);
    if (userData.email === 'fresh2dooradmin@gmail.com') {
      navigate('/newproduct');
    } else {
      toast('You are not authorized to access this feature(Admin Features)');
    }
  }

  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    let [lat, long] = latlong;
    const response = await fetch("http://localhost:5000/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })
    });
    const { location } = await response.json();
    setAddress(location);
    setLoading(false);
  }

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      toast('Please log in first');
      navigate('/login');
    }
  }

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed w-full h-16 shadow-md px-2 md:px-4 z-50 bg-white">
      {/* desktop version */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-12 flex items-center md:text-lg font-bold font-sans">
            <h1 className="text-xl">
              <span style={{ color: 'green' }}>Fresh</span>
              <span style={{ color: 'red' }}>2</span>
              <span style={{ color: 'green' }}>Door</span>
            </h1>
          </div>
        </Link>
        <div className="flex items-center">
          <button onClick={handleClick} disabled={loading} className="flex items-center">
            {loading ? <RiLoader3Line className="animate-spin mr-2" /> : <MdMyLocation className="mr-2" />}
            {loading ? 'Detecting your location...' : address || 'Detect your location'}
          </button>
        </div>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className=" gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""} className="hover:text-slate-700">Home</Link>
            <Link to={"menu/64380e5a3117eade68edec54"} className="hover:text-slate-700">Menu</Link>
            <Link to={"about"} className="hover:text-slate-700">About</Link>
            <Link to={"contact"} className="hover:text-slate-700">Contact</Link>
          </nav>
          <div className="text-2xl relative cursor-pointer">
            <div onClick={handleCartClick}>
              <CiShoppingCart />
              <div className="absolute -top-1 -right-1 text-white bg-black h-4 w-4  rounded-full m-0 pb-.1  text-sm text-center flex justify-center items-center">{cartItemNumber.length}</div>
            </div>
          </div>
          <div className="text-2xl" onClick={handleShowMenu}>
            {isLoggedIn ? (
              <div className="cursor-pointer w-7 h-7 rounded-full overflow-hidden drop-shadow-md">
                {userData.image ? <img src={userData.image} alt="user" className="h-full w-full"/> : <CiUser />}
              </div>
            ) : (
              <Link to={"login"} className="cursor-pointer w-7 h-7 rounded-full overflow-hidden drop-shadow-md">
                <CiUser />
              </Link>
            )}
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md text-base flex flex-col min-w-[120px] text-center">
               
{isLoggedIn ? (
  <>
     {(
  <p className="whitespace-nowrap cursor-pointer px-2" onClick={handleNewProduct}>New product</p>
)}
    <p className="whitespace-nowrap cursor-pointer px-2" onClick={handleLogout}>Logout</p>
  </>
) : (
  <Link to={"login"} className="whitespace-nowrap cursor-pointer px-2 py-2">Login</Link>
)}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="hover:text-slate-700 px-2 py-2">Home</Link>
                  <Link to={"menu/64380e5a3117eade68edec54"} className="hover:text-slate-700 px-2 py-2">Menu</Link>
                  <Link to={"about"} className="hover:text-slate-700 px-2 py-2">About</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* mobile version */}
    </header>
  );
}

export default Header;

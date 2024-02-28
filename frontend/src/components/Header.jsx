import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RiLoader3Line } from "react-icons/ri";
import { MdMyLocation } from "react-icons/md";
import { useAuth } from "../components/Authcontext";
import toast from "react-hot-toast";
import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSlice";
function Header() {
  const { isLoggedIn } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // const userData = useSelector((state) => state);
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
      const fetchData = await fetch("https://fresh2door-2.onrender.com/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message);

      if (dataRes.alert) {
        setShowModal(false);
        login();
        dispatch(loginRedux(dataRes));
      }
    } else {
      alert("Please fill in all required fields");
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleShowMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleLogout = () => {
    // Redirect to the login page
    navigate("/login");
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
      setShowModal(true);
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
          <div className="text-2xl" onClick={handleShowMenu}>
            {isLoggedIn ? (
              <div className="cursor-pointer w-7 h-7 rounded-full overflow-hidden drop-shadow-md">
                {userData.image ? (
                  <img
                    src={userData.image}
                    alt="user"
                    className="h-full w-full"
                  />
                ) : (
                  <CiUser />
                )}
              </div>
            ) : (
              <Link
                to={"login"}
                className="cursor-pointer w-7 h-7 rounded-full overflow-hidden drop-shadow-md"
              >
                <CiUser />
              </Link>
            )}

            <button
              onClick={toggleModal}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Login
            </button>

            {/* Main modal */}
            {showModal && (
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
                        onClick={toggleModal}
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                          Not registered?{" "}
                          <a
                            href="#"
                            className="text-green-700 hover:underline dark:text-green-500"
                          >
                            Create account
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md text-base flex flex-col min-w-[120px] text-center">
                {isLoggedIn ? (
                  <>
                    {
                      <p
                        className="whitespace-nowrap cursor-pointer px-2"
                        onClick={handleNewProduct}
                      >
                        New product
                      </p>
                    }
                    <p
                      className="whitespace-nowrap cursor-pointer px-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2 py-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="hover:text-slate-700 px-2 py-2">
                    Home
                  </Link>
                  <Link
                    to={"menu/64380e5a3117eade68edec54"}
                    className="hover:text-slate-700 px-2 py-2"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="hover:text-slate-700 px-2 py-2">
                    About
                  </Link>
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

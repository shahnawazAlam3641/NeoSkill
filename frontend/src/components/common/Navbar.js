import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import toast from "react-hot-toast";

// const subLinks = [
//   {
//     title: "Python",
//     link: "/catalog/python",
//   },
//   {
//     title: "javascript",
//     link: "/catalog/javascript",
//   },
//   {
//     title: "web-development",
//     link: "/catalog/web-development",
//   },
//   {
//     title: "Android Development",
//     link: "/catalog/Android Development",
//   },
// ];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isDropdown, setIsDropdown] = useState(false);

  const burgerDropdownRef = useRef(null);

  useOnClickOutside(burgerDropdownRef, () => setIsDropdown(false));
  const timeoutRef = useRef(null);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const toastId = toast.loading("Loading...");

        // timeout to show a different toast message if the API call takes more than 6 seconds
        timeoutRef.current = setTimeout(() => {
          toast.dismiss(toastId);
          toast.loading("Starting Backend server please wait", {
            id: "backend-loading",
          });
        }, 6000);

        const res = await apiConnector("GET", categories.CATEGORIES_API);

        // Clear the timeout as the API call has completed
        clearTimeout(timeoutRef.current);

        setSubLinks(res.data.allCategories);
        toast.dismiss(toastId);
        // Also dismiss the backend loading toast
        toast.dismiss("backend-loading");
      } catch (error) {
        console.log("Could not fetch Categories.", error);
        toast.dismiss();
        toast.error("Failed to fetch categories");
      }
      setLoading(false);
    };

    getCategories();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      toast.dismiss();
    };
  }, []);

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button
          className="mr-4 md:hidden "
          onClick={() => setIsDropdown(!isDropdown)}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>

        {/* burger dropdown */}
        {isDropdown && (
          <>
            <div className="absolute md:hidden text-white right-[7%] top-[6.5%] z-40 rotate-45 rounded-sm bg-richblack-800 shadow-white shadow-2xl min-h-5 min-w-5"></div>
            <div
              onClick={(e) => e.stopPropagation()}
              ref={burgerDropdownRef}
              className="absolute md:hidden text-white right-[5%] top-[7%] z-50 rounded-md bg-richblack-800 p-4 flex flex-col gap-4 transition-all duration-500 shadow-2xl shadow-richblack-900"
            >
              <nav className="">
                <ul className="flex flex-col gap-4 items-center text-richblack-25">
                  {NavbarLinks.map((link, index) => (
                    <li key={index}>
                      {link.title === "Catalog" ? (
                        <>
                          <div
                            className={`group relative flex cursor-pointer items-center gap-1 ${
                              matchRoute("/catalog/:catalogName")
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            }`}
                          >
                            <p>{link.title}</p>
                            <BsChevronDown />
                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[150px] translate-x-[-50%] translate-y-[3em] flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 ">
                              <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                              {loading ? (
                                <p className="text-center">Loading...</p>
                              ) : subLinks.length ? (
                                <>
                                  {subLinks
                                    ?.filter(
                                      (subLink) => subLink?.courses?.length > 0
                                    )
                                    ?.map((subLink, i) => (
                                      <Link
                                        to={`/catalog/${subLink.name
                                          .split(" ")
                                          .join("-")
                                          .toLowerCase()}`}
                                        className="rounded-lg bg-transparent  hover:bg-richblack-50"
                                        key={i}
                                      >
                                        <p>{subLink.name}</p>
                                      </Link>
                                    ))}
                                </>
                              ) : (
                                <p className="text-center">No Courses Found</p>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link to={link?.path}>
                          <p
                            className={`${
                              matchRoute(link?.path)
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            }`}
                          >
                            {link.title}
                          </p>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              {/* Login / Signup / Dashboard */}
              <div className=" items-center gap-4 flex flex-col">
                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link to="/dashboard/cart" className="relative">
                    <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                    {totalItems > 0 && (
                      <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                {token === null && (
                  <Link to="/login">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Log in
                    </button>
                  </Link>
                )}
                {token === null && (
                  <Link to="/signup">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Sign up
                    </button>
                  </Link>
                )}
                {token !== null && <ProfileDropdown />}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

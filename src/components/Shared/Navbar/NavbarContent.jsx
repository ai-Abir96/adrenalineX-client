import { NavLink } from "react-router-dom";
import useAuth from "../../../utils/hooks/useAuth";
import Swal from "sweetalert2";
import ReactSwitch from "react-toggle";
import { useContext } from "react";
import { ThemeContext } from "../../../utils/providers/ThemeProvider";
import "react-toggle/style.css";
import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
const NavbarContent = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        icon: "success",
        title: "Logged Out Successful",
      });
    });
  };

  return (
    <>
      <div className="navbar-start lg:flex justify-between lg:flex-start lg:justify-normal">
        <div className="dropdown ">
          <label tabIndex={0} className=" text-3xl lg:hidden">
            <GiHamburgerMenu />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm uppercase dropdown-content mt-3 p-2 bg-slate-100  shadow  text-black rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/instructors">Instructors</NavLink>
            </li>
            <li>
              <NavLink to="/classes">Classes</NavLink>
            </li>

            {user ? (
              <li className="pl-4">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            ) : (
              <li className="pl-4 hidden">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="hidden lg:block">
          <a className="font-bold text-[30px] grad-text-primary uppercase">
            <span className=" ">
              Adrenaline
              <span className="text-[40px] font-extrabold">X</span>
            </span>
          </a>
        </div>
      </div>
      <div className="navbar-center ">
        <div className="lg:hidden">
          <a className="font-bold text-[30px] grad-text-primary uppercase">
            <span className=" ">
              Adrenaline
              <span className="text-[40px] font-extrabold">X</span>
            </span>
          </a>
        </div>
        <div className="hidden lg:flex">
          <ul className=" flex lg:text-lg text-base font-bold uppercase">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/instructors">Instructors</NavLink>
            </li>
            <li>
              <NavLink to="/classes">Classes</NavLink>
            </li>

            {user ? (
              <li className="pl-4">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            ) : (
              <li className="pl-4 hidden">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <div className=" mr-4">
          <ReactSwitch
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
        </div>
        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="avatar">
              <div className=" w-[70px] h-[70px] rounded-full ml-5">
                {user?.photoURL ? <img src={user.photoURL} /> : ""}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content lg:hidden mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className=" text-black">
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
        <div className="dropdown dropdown-end  md:flex ">
          {user ? (
            <div>
              <button
                onClick={handleLogout}
                className="btn hidden btn-primary-custom lg:block"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <NavLink to="/login">
                <button className=" btn btn-primary-custom font-semibold">
                  Login
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarContent;

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../utils/hooks/useAuth";
import Swal from "sweetalert2";
import ReactSwitch from "react-toggle";
import { useContext } from "react";
import { ThemeContext } from "../../../utils/providers/ThemeProvider";
import { FaHome } from "react-icons/fa";
const SharedDrawerCompoent = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        icon: "success",
        title: "Logged Out Successful",
      });
      navigate("/");
    });
  };

  return (
    <>
      <li className=" hover:bg-slate-950 rounded-lg uppercase">
        <NavLink to="/">
          <FaHome />
          Home
        </NavLink>
      </li>

      <button
        onClick={handleLogout}
        className="btn btn-primary-custom mt-5 "
      >
        Logout
      </button>

      <li>
        <div className=" lg:mt-5 mt-2 self-center">
          <ReactSwitch
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
        </div>
      </li>
    </>
  );
};

export default SharedDrawerCompoent;

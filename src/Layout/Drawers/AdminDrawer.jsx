import { Link } from "react-router-dom";
import SharedDrawerCompoent from "../../components/Shared/SharedDrawerCompoent/SharedDrawerCompoent";
import SharedUserDrawerComponent from "../../components/Shared/SharedDrawerCompoent/SharedUserDrawerComponent";
import { RiAdminFill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { MdOutlineClass } from "react-icons/md";
const AdminDrawer = () => {
  return (
    <>
      <ul className="menu lg:text-lg h-full px-4 lg:w-[350px] w-7/12 bg-blue-900 text-white">
        <SharedUserDrawerComponent />
        <li className=" hover:bg-slate-950 rounded-lg uppercase">
          <Link to="/dashboard/super/home">
            <RiAdminFill />
            Admin | Home
          </Link>
        </li>
        <li className="hover:bg-slate-950 rounded-lg uppercase">
          <Link to="/dashboard/super/manage-user">
            {" "}
            <FiUsers />
            Manage Users
          </Link>
        </li>
        <li className="hover:bg-slate-950 rounded-lg uppercase ">
          <Link to="/dashboard/super/manage-class">
            <MdOutlineClass />
            Manage Classes
          </Link>
        </li>
        <hr className=" border-b-4 border-cyan-600 " />
        <SharedDrawerCompoent />
      </ul>
    </>
  );
};

export default AdminDrawer;

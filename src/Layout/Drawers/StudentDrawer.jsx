import { NavLink } from "react-router-dom";
import SharedDrawerCompoent from "../../components/Shared/SharedDrawerCompoent/SharedDrawerCompoent";
import SharedUserDrawerComponent from "../../components/Shared/SharedDrawerCompoent/SharedUserDrawerComponent";
import { FaUserGraduate } from "react-icons/fa";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdPendingActions } from "react-icons/md";
const StudentDrawer = () => {
  return (
    <>
      <ul className="menu  lg:text-lg  h-full px-4 lg:w-[350px]  w-7/12 bg-blue-900 text-white">
        <SharedUserDrawerComponent />
        <li className=" hover:bg-slate-950 rounded-lg uppercase">
          <NavLink to="/dashboard/student/home">
            <FaUserGraduate /> Student | Home
          </NavLink>
        </li>
        <li className="hover:bg-slate-950 rounded-lg uppercase">
          <NavLink to="/dashboard/student/selected/my-classes">
            <MdPendingActions />
            My Selected Classes
          </NavLink>
        </li>
        <li className="hover:bg-slate-950 rounded-lg uppercase">
          <NavLink to="/dashboard/student/enrolled/my-classes">
            <GrCheckboxSelected /> My Enrolled Classes
          </NavLink>
        </li>
        <li className="hover:bg-slate-950 rounded-lg uppercase">
          <NavLink to="/dashboard/student/payment/history">
            Payment History
          </NavLink>
        </li>
        <hr className=" border-b-4 border-cyan-600" />
        <SharedDrawerCompoent />
      </ul>
    </>
  );
};

export default StudentDrawer;

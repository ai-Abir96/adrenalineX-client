import { Link } from "react-router-dom";
import SharedDrawerCompoent from "../../components/Shared/SharedDrawerCompoent/SharedDrawerCompoent";
import SharedUserDrawerComponent from "../../components/Shared/SharedDrawerCompoent/SharedUserDrawerComponent";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineClass } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
const InstructorDrawer = () => {
  return (
    <>
      <ul className="menu lg:text-lg h-full px-4 lg:w-[350px] w-7/12  bg-blue-900 text-white">
        <SharedUserDrawerComponent />
        <li className=" hover:bg-slate-950 rounded-lg uppercase">
          <Link to="/dashboard/instructor/home">
            <GiTeacher /> Instructor | Home
          </Link>
        </li>
        <li className="hover:bg-slate-950 rounded-lg uppercase">
          <Link to="/dashboard/instructor/add-class">
            <GrAddCircle /> Add a Class
          </Link>
        </li>
        <li className="hover:bg-slate-950 rounded-lg uppercase">
          <Link to="/dashboard/instructor/my-classes">
            <MdOutlineClass /> My Classes
          </Link>
        </li>
        <hr className=" border-b-4 border-cyan-600 lg:my-10 my-4" />
        <SharedDrawerCompoent />
      </ul>
    </>
  );
};

export default InstructorDrawer;

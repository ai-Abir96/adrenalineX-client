import { Outlet } from "react-router-dom";
import AdminDrawer from "../Drawers/AdminDrawer";
import InsructorDrawer from "../Drawers/InstructorDrawer";
import StudentDrawer from "../Drawers/StudentDrawer";
import useUserRole from "../../utils/hooks/useUserRole";
import { useContext } from "react";
import { ThemeContext } from "../../utils/providers/ThemeProvider";
import { GiHamburgerMenu } from "react-icons/gi";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { userRole, isLoading } = useUserRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={theme}>
      <div className="drawer lg:drawer-open">
        <input
          id="customDrawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content ">
          <div className=" w-full flex flex-col items-center justify-center">
            <label
              htmlFor="customDrawer"
              className="btn w-full rounded-none bg-blue-700 drawer-open border-0 lg:hidden"
            >
              <GiHamburgerMenu />
            </label>
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="customDrawer"
            className="drawer-overlay"
          ></label>

          {userRole?.admin && <AdminDrawer />}
          {userRole?.instructor && <InsructorDrawer />}
          {userRole?.student && <StudentDrawer />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

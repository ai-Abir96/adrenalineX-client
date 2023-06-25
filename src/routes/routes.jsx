import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Main from "../Layout/Main/Main";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

import Dashboard from "../Layout/Dashboard/Dashboard";
import ManageUsers from "../pages/DashboardPages/Admin/ManageUsers/ManageUsers";
import ManageClass from "../pages/DashboardPages/Admin/ManageClass.jsx/ManageClass";
import AdminHome from "../pages/DashboardPages/Admin/AdminHome/AdminHome";
import InstructorHome from "../pages/DashboardPages/Instructor/InstructorHome/InstructorHome";
import AddaClass from "../pages/DashboardPages/Instructor/AddaClass/AddaClass";
import ClassesPage from "../pages/ClassesPage/ClassesPage";
import InstructorPage from "../pages/InstructorsPage/InstructorPage";
import MyClasses from "../pages/DashboardPages/Instructor/MyClass/MyClass";
import StudentHome from "../pages/DashboardPages/Student/StudentHome/StudentHome";
import SeclectedClass from "../pages/DashboardPages/Student/SelectedClass/SeclectedClass";
import EnrolledClass from "../pages/DashboardPages/Student/EnrolledClass/EnrolledClass";
import Payment from "../pages/DashboardPages/Student/Payment/Payment";
import PaymentHistory from "../pages/DashboardPages/Student/PaymentHistory/PaymentHistory";
import Feedback from "../pages/DashboardPages/Admin/Feedback/Feedback";
import AdminRoute from "./AdminRoute";
import InstrcutorRoute from "./InstrcutorRoute";
import PrivateRoute from "./PrivateRoute";
import UpdateClass from "../pages/DashboardPages/Instructor/UpdateClass/UpdateClass";
import NotFoundPage from "../pages/404Page/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/classes",
        element: <ClassesPage />,
      },
      {
        path: "/instructors",
        element: <InstructorPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/super/home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/super/manage-class",
        element: (
          <AdminRoute>
            <ManageClass />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/super/manage-user",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/super/feedback/:classId",
        element: (
          <AdminRoute>
            <Feedback />
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/instructor/home",
        element: (
          <InstrcutorRoute>
            <InstructorHome />
          </InstrcutorRoute>
        ),
      },
      {
        path: "/dashboard/instructor/add-class",
        element: (
          <InstrcutorRoute>
            <AddaClass />
          </InstrcutorRoute>
        ),
      },
      {
        path: "/dashboard/instructor/my-classes",
        element: (
          <InstrcutorRoute>
            <MyClasses />
          </InstrcutorRoute>
        ),
      },
      {
        path: "/dashboard/instructor/update/class/:classId",
        element: (
          <InstrcutorRoute>
            <UpdateClass />
          </InstrcutorRoute>
        ),
      },

      {
        path: "/dashboard/student/home",
        element: (
          <PrivateRoute>
            <StudentHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/student/selected/my-classes",
        element: (
          <PrivateRoute>
            <SeclectedClass />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/student/enrolled/my-classes",
        element: (
          <PrivateRoute>
            <EnrolledClass />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/student/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/student/payment/history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

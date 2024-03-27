import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//LAYOUTS
import { MainLayout } from "./layouts/mainLayout";
import { CommonLayout } from "./layouts/CommonLayout";
import { CourseSidebar } from "./layouts/CourseSidebar/";


//USER PAGES
import { Home } from "./pages/home/";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import { Courses } from "./pages/courses";
import { CoursesDetails } from "./pages/courses-details/index";
import { EditComment } from "./pages/courses-details/edit-comment";


//ADMIN
import { AdminDashboard } from './admin/adminDashboard';
import { AdminCourses } from './admin/adminCourses/';
import { AdminUpdateCourses } from './admin/adminCourses/adminUpdateCourses';
import { AdminTerms } from './admin/adminTerms/';
import { AdminUpdateTerms } from './admin/adminTerms/adminUpdateTerms';
import { AdminDepartment } from './admin/adminDepartment/';
import { AdminUpdateDepartment } from './admin/adminDepartment/adminUpdateDepartment';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <CommonLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "about-us",
            element: <AboutUs />,
          },
          {
            path: "courses",
            element: <CourseSidebar />,
            children: [
              {
                index: true,
                element: <Courses />,
              },
            ],
          },
          {
            path: "courses-details/:coursesId",
            element: <CoursesDetails />,
          },
          {
            path: "edit-comment/:reviewID",
            element: <EditComment />,
        },        
        ],
      },
      {
        path: "adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "adminCourses",
        element: <AdminCourses />,
      },
      {
        path: "adminUpdateCourses/:coursesID",
        element: <AdminUpdateCourses />,
      },
      {
        path: "adminTerms",
        element: <AdminTerms />,
      },
      {
        path: "adminUpdateTerms/:termID",
        element: <AdminUpdateTerms />,
      },
      {
        path: "adminDepartment",
        element: <AdminDepartment />,
      },
      {
        path: "adminUpdateDepartment/:departmentID",
        element: <AdminUpdateDepartment />,
      },
    ]
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
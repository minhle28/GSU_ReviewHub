import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//LAYOUTS
import { MainLayout } from "./layouts/mainLayout";
import { CommonLayout } from "./layouts/CommonLayout";
import { CourseSidebar } from "./layouts/CourseSidebar/";


//PAGES
import { Home } from "./pages/home/";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import { Courses } from "./pages/courses";
import { CoursesDetails } from "./pages/courses-details";


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
            path: "",
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
            path: "courses-details/:id",
            element: <CoursesDetails />,
          },
        ],
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
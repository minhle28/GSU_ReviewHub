import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//LAYOUTS
import { MainLayout } from "./layouts/mainLayout";
import { CommonLayout } from "./layouts/CommonLayout";


//PAGES
import { Home } from "./pages/home/";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import { Courses } from "./pages/courses";


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
            element: <Courses />,
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
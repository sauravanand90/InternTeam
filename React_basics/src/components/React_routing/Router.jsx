import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Home';
import About from './About';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import ParamComp from './ParamComp';
import Courses from './Courses';
import MockTests from './MockTests';
import Reports from './Reports';
import NotFound from './NotFound';

  const router=createBrowserRouter(
    [
        {
            path:"/",
            element:
            <div>
                <Navbar />
                <Home />
            </div>
        },

        {
            path:"/about",
            element:
            <div>
                <Navbar />
                <About />
             </div>
        },

        {
            path:"/dashboard",
            element:
            <div>
                <Navbar />
                <Dashboard />
            </div>,//nested routing use the children , incase i want to add sub navigation under dashboard
            children:[
                //use {},{},{} for multiple routing and path and elements for routing
                {
                    path:'courses',
                    element:<Courses/>
                },

                {
                    path:'mock-tests', //for child routes path no need to add "/" this 
                    element:<MockTests /> //and use <Outlet /> in the parent to render the child
                },

                {
                    path:'reports',
                    element:<Reports />
                }
            ]
        },
        {
            path:"/student/:id",
            element:
            <div>
                <Navbar />
                <ParamComp />
            </div>
        },
        {
            path:'*',
            element:<NotFound />
        }
    ]
  );

const Router_B=()=> {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default Router_B

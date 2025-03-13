import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home'
import About from './About'
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Params from './Params';
import Courses from './Courses';
import Mocktests from './Mocktests';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <div>
                <Navbar />
                <Home />
            </div>
        },
        {
            path: "/about",
            element: <div>
                <Navbar />
                <About />
            </div>
        },
        {
            path: "/dashboard",
            element: <div>
                <Navbar />
                <Dashboard />
            </div>, 
            children:[
                {
                    path:'courses',
                    element:<Courses />
                },
                {
                    path:'mock-tests',
                    element:<Mocktests />
                }
            ]
        },
        {
            path: "/student/:id",
            element: <div>
                <Navbar />
                <Params />
            </div>
        }
    ]
);

function Navigation() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default Navigation;

import React, { useEffect, useState } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminDashboard.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export const AdminDashboard = () => {
    const [sidebarHidden, setSidebarHidden] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get("isAdmin") !== '1')
            navigate("/");
    });

    const handleToggleSidebar = () => {
        setSidebarHidden(!sidebarHidden);
    };

    const handleDarkModeChange = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark');
    };
    return (
        <section id="content" className='adminPage'>
            <Sidebar />
            <Navbar
                onToggleSidebar={handleToggleSidebar}
                onDarkModeChange={handleDarkModeChange}
            />
            <main>
                <div class="head-title">
                    <div class="adminLeft">
                        <h1>Dashboard</h1>
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">Dashboard</a>
                            </li>
                            <li><i class='bx bx-chevron-right' ></i></li>
                            <li>
                                <a class="active" href="#">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <ul class="box-info">
                    <li>
                        <i class='bx bxs-group' ></i>
                        <span class="text">
                            <h3>1</h3>
                            <p>Visitors</p>
                        </span>
                    </li>
                    <li>
                        <i class='bx bxs-dollar-circle' ></i>
                        <span class="text">
                            <h3>$131,4920</h3>
                            <p>Total Earns</p>
                        </span>
                    </li>
                </ul>


                <div class="table-data">
                    <div class="order">
                        <div class="head">
                            <h3>Login Activity</h3>
                            <i class='bx bx-search' ></i>
                            <i class='bx bx-filter' ></i>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Operator</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>OS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Minh Le</p>
                                    </td>
                                    <td>04-01-2024</td>
                                    <td>Admin</td>
                                    <td><span class="status completed">Success</span></td>
                                    <td>Administrator</td>
                                    <td>Mac</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </section>
    );
}

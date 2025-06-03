import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Sidebar() {

    const[isOpen, setIsOpen] = useState(false);

    //    usetogglebutton
    useEffect(() => {
        const toggleHandler = function () {
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
            }
        };

        $("#sidebarToggle, #sidebarToggleTop").on('click', toggleHandler);

        // Cleanup
        return () => {
            $("#sidebarToggle, #sidebarToggleTop").off('click', toggleHandler);
        };
    }, []);

    return (
        <>
            {/* <!-- Sidebar --> */}
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                    </div>
                    <div className="sidebar-brand-text mx-3"><img src="Admin/img/bookingwhizz-white.png" alt="Logo" style={{ width: "160px" }} /></div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Interface
                </div>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" onClick={() => setIsOpen(!isOpen)}>
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Reporting</span>
                    </a>

                    <div className={`collapse ${isOpen ? 'show' : ''}`} id="collapseTwo">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/report">TotalBooking</Link>
                            <a className="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                </li>

                 <li className="nav-item">
                 <a className="nav-link collapsed" href="#" onClick={() => setIsOpen(!isOpen)}>
                        <i className="fas fa-fw fa-cog"></i>
                        <span>LogManagement</span>
                    </a>

                    <div className={`collapse ${isOpen ? 'show' : ''}`} id="collapseTwo">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <Link className="collapse-item" to="/accommodation">Log_Accommodation</Link>
                                <Link className="collapse-item" to="/rooms">Log_Room</Link>
                            </div>
                        </div>
                    </li> 

                {/* <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                            aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-wrench"></i>
                            <span>Utilities</span>
                        </a>
                        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                            data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Custom Utilities:</h6>
                                <a className="collapse-item" href="utilities-color.html">Colors</a>
                                <a className="collapse-item" href="utilities-border.html">Borders</a>
                                <a className="collapse-item" href="utilities-animation.html">Animations</a>
                                <a className="collapse-item" href="utilities-other.html">Other</a>
                            </div>
                        </div>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">
                        Addons
                    </div>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                            aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Pages</span>
                        </a>
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Login Screens:</h6>
                                <a className="collapse-item" href="login.html">Login</a>
                                <a className="collapse-item" href="register.html">Register</a>
                                <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                                <div className="collapse-divider"></div>
                                <h6 className="collapse-header">Other Pages:</h6>
                                <a className="collapse-item" href="404.html">404 Page</a>
                                <a className="collapse-item" href="blank.html">Blank Page</a>
                            </div>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="charts.html">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Charts</span></a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="tables.html">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Tables</span></a>
                    </li> */}

                <hr className="sidebar-divider d-none d-md-block" />
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        </>
    )
}

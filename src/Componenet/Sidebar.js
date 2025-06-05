import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Sidebar() {

    const[isOpen, setIsOpen] = useState(false);
    const [isReportingOpen, setIsReportingOpen] = useState(false);
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
                 <a className="nav-link collapsed" href="#" onClick={() => setIsReportingOpen(!isReportingOpen)}>
                        <i className="fas fa-fw fa-cog"></i>
                        <span>LogManagement</span>
                    </a>

                    <div className={`collapse ${isReportingOpen ? 'show' : ''}`} id="collapseTwo">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <Link className="collapse-item" to="/accommodation">Log_Accommodation</Link>
                                <Link className="collapse-item" to="/rooms">Log_Room</Link>
                                <Link className="collapse-item" to="/rateplan">Log_Ratepaln</Link>
                                <Link className="collapse-item" to="/roominventorylog">RoomInventoryLog</Link>
                                <Link className="collapse-item" to="/rateinventory">RateInventory</Link>

                            </div>
                        </div>
                    </li> 
                <hr className="sidebar-divider d-none d-md-block" />
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        </>
    )
}

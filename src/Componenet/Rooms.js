import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../Context/ProductContext';
import $ from 'jquery';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';
import "datatables.net";

export default function Rooms() {
    const context = useContext(ProductContext)
    const { AccommodationList, accommodationsearch, SelectRooms, room, RoomList, roomlist } = context
    const [selectedAccommodationId, setSelectedAccommodationId] = useState('');
    const [P_StartDate, setStartDate] = useState('');
    const [P_EndDate, setEndDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectRoom, setselectRoom] = useState('');

    const [showDropdown, setShowDropdown] = useState(false);

    const handleChangess = (e) => {
        setStartDate(e.target.value);
        setEndDate(e.target.value);
        localStorage.setItem("P_StartDate", setStartDate)
        localStorage.setItem("P_EndDate", setEndDate)

    }
    // datepicker
    useEffect(() => {
        $('#dateRangePicker').daterangepicker({
            opens: 'right',
            locale: {
                format: 'DD/MM/YYYY'
            }
        }, function (start, end) {
            setStartDate(start.format('YYYY-MM-DD'));
            setEndDate(end.format('YYYY-MM-DD'));
        });

    }, []);

    // searchrabledropdown
    useEffect(() => {
        if (searchText.length >= 3) {
            const debounce = setTimeout(() => {
                AccommodationList(searchText);
                setShowDropdown(true);
            }, 300);

            return () => clearTimeout(debounce);
        } else {
            setShowDropdown(false);
        }
    }, [searchText, AccommodationList]);

    // selectAccommodationShowRooms
    const handleSelect = (item) => {
        setSearchText(item.accommodationIdName);
        setSelectedAccommodationId(item.accommodationId);
        setShowDropdown(false);
        SelectRooms(item.accommodationId, 0);
    };

    const Formsubmit = async (e) => {
        e.preventDefault();
        // Case: No accommodation selected → always invalid
        if (!selectedAccommodationId || !selectRoom) {
            alert("Please select an accommodation.");
            console.log("accommodation", selectRoom);
            return;
        }
        // Case: Accommodation is selected but one date is missing → invalid
        if ((P_StartDate && !P_EndDate) || (!P_StartDate && P_EndDate)) {
            alert("Please select both Start and End dates.");
            return;
        }
        // ✅ Valid in both cases: only accommodation OR all three fields
        await RoomList(selectedAccommodationId, P_StartDate, P_EndDate, selectRoom);
    }

    useEffect(() => {
        RoomList();
    }, [])

    return (
        <>
            <div id='content'>
                <div className="container-fluid">
                    {/* showform */}
                    <div className="container">
                        <div className="d-flex justify-content-center">
                            <div className="col-md-12">
                                <form onSubmit={Formsubmit}>
                                    <div className="row">

                                        <div className="col-4">
                                            <label htmlFor="dateRangePicker">Select AccommodationName</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Accommodation"
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                autoComplete="off"
                                            />
                                            {showDropdown && accommodationsearch.length > 0 && (
                                                <ul
                                                    className="list-group position-absolute"
                                                    style={{
                                                        zIndex: 999,
                                                        maxHeight: '200px',
                                                        overflowY: 'auto',
                                                        width: '300px', // fix width here
                                                        boxSizing: 'content-box',
                                                        margin: 0,
                                                        padding: 0,
                                                    }}
                                                >
                                                    {accommodationsearch.map((item) => (
                                                        <li
                                                            key={item.accommodationId}
                                                            className="list-group-item list-group-item-action"
                                                            onClick={() => handleSelect(item)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                width: '100%', // ensure full width
                                                                padding: '8px 12px', // adjust padding as needed
                                                                boxSizing: 'border-box',
                                                            }}
                                                        >
                                                            {item.accommodationIdName}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}


                                            {/* {showDropdown && accommodationsearch.length > 0 && (
                                                <ul className="list-group position-absolute w-100" style={{ zIndex: 999 }}>
                                                    {accommodationsearch.map((item) => (
                                                        <li
                                                            key={item.accommodationId}
                                                            className="list-group-item list-group-item-action"
                                                            onClick={() => handleSelect(item)}
                                                            style={{ cursor: 'pointer', width: '300px' }}
                                                        >
                                                            {item.accommodationIdName}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )} */}
                                        </div>

                                        <div className="col-3">
                                            <label>Rooms</label>
                                            <select className='form-control' value={selectRoom} onChange={(e) => setselectRoom(e.target.value)}>
                                                <option value="">Select Room</option>
                                                {room && room.length > 0 && room.map((room, index) => (
                                                    <option key={index} value={room.roomId}>
                                                        {room.roomName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-3">
                                            <label htmlFor="dateRangePicker">Date Range</label>
                                            <input type="text" id="dateRangePicker" className="form-control" onChange={handleChangess} />
                                            <input type="hidden" value={P_StartDate} />
                                            <input type="hidden" value={P_EndDate} />
                                        </div>

                                        <div className="col-2">
                                            <button type="submit" className="btn btn-primary" id="searchButton" style={{ marginTop: "30px" }}>
                                                <i className="ti-save-alt" style={{ color: "white" }}></i> Search
                                            </button>
                                        </div>

                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>
                    <br />

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Rooms List</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%">
                                    <thead>
                                        <tr style={{ fontSize: "10px" }}>
                                            <th>LogDate</th>
                                            <th>LogDateLocal</th>
                                            <th>Pre_UserName</th>
                                            <th>New_UserName</th>
                                            <th>AccommodationId</th>
                                            <th>AccommodationName</th>
                                            <th>RoomName</th>
                                            <th>Pre_RackRate</th>
                                            <th>New_RackRate</th>
                                            <th>Pre_MaxPersons</th>
                                            <th>New_MaxPersons</th>
                                            <th>Pre_NoOfBeds</th>
                                            <th>New_NoOfBeds</th>
                                            <th>Pre_BathRoomDetail</th>
                                            <th>New_BathRoomDetail</th>
                                            <th>Pre_RoomDescription</th>
                                            <th>New_RoomDescription</th>
                                            <th>Pre_StatusName</th>
                                            <th>New_StatusName</th>
                                            <th>Pre_RoomSize</th>
                                            <th>New_RoomSize</th>
                                            <th>Pre_BedSize</th>
                                            <th>New_BedSize</th>
                                            <th>Pre_TotalGuest</th>
                                            <th>New_TotalGuest</th>
                                            <th>Pre_Address</th>
                                            <th>New_Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roomlist && roomlist.length > 0 ? (
                                            roomlist.map((item, index) => (
                                                <tr key={index}>
                                                    <td style={{ whiteSpace: "nowrap" }}>{item.LogDate}</td>
                                                    <td>{item.LogDateLocal}</td>
                                                    <td>{item.Pre_UserName}</td>
                                                    <td>{item.New_UserName}</td>
                                                    <td>{item.AccommodationId}</td>
                                                    <td>{item.AccommodationName}</td>
                                                    <td>{item.RoomName}</td>
                                                    <td>{item.Pre_RackRate}</td>
                                                    <td>{item.New_RackRate}</td>
                                                    <td>{item.Pre_MaxPersons}</td>
                                                    <td>{item.New_MaxPersons}</td>
                                                    <td>{item.Pre_NoOfBeds}</td>
                                                    <td>{item.New_NoOfBeds}</td>
                                                    <td>{item.Pre_BathRoomDetail}</td>
                                                    <td>{item.New_BathRoomDetail}</td>
                                                    <td>{item.Pre_RoomDescription}</td>
                                                    <td>{item.New_RoomDescription}</td>
                                                    <td>{item.Pre_StatusName}</td>
                                                    <td>{item.New_StatusName}</td>
                                                    <td>{item.Pre_RoomSize}</td>
                                                    <td>{item.New_RoomSize}</td>
                                                    <td>{item.Pre_BedSize}</td>
                                                    <td>{item.New_BedSize}</td>
                                                    <td>{item.Pre_TotalGuest}</td>
                                                    <td>{item.New_TotalGuest}</td>
                                                    <td>{item.Pre_Address}</td>
                                                    <td>{item.New_Address}</td>
                                                </tr>
                                            ))

                                        ) : (

                                            <tr>
                                                <td colSpan="12" style={{ textAlign: "left" }}>
                                                    No data available
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

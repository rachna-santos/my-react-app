import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../Context/ProductContext';
import $ from 'jquery';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';
import "datatables.net";

export default function Rateinventory() {
    const context = useContext(ProductContext)
    const { AccommodationList, accommodationsearch, SelectRooms, room, RoomList, Rateplan, rateplan, RateplanList, rateplanlist, RateInventory, rateinventory } = context
    const [selectedAccommodationId, setSelectedAccommodationId] = useState('');
    const [P_StartDate, setStartDate] = useState('');
    const [P_EndDate, setEndDate] = useState('');
    const [P_LogStartDate, setLogStartDate] = useState('');
    const [P_LogEndDate, setLogEndDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectRoom, setselectRoom] = useState('');
    const [selectRateplan, setselectRateplan] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChangess = (e) => {
        setStartDate(e.target.value);
        setEndDate(e.target.value);
        setLogStartDate(e.target.value);
        setLogEndDate(e.target.value);
        localStorage.setItem("P_StartDate", setStartDate)
        localStorage.setItem("P_EndDate", setEndDate)
        localStorage.setItem("P_LogStartDate", setLogStartDate)
        localStorage.setItem("P_LogEndDate", setLogEndDate)

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

    //datepicker2
    useEffect(() => {
        $('#dateRangePicker2').daterangepicker({
            opens: 'right',
            locale: {
                format: 'DD/MM/YYYY'
            }
        }, function (start, end) {
            setLogStartDate(start.format('YYYY-MM-DD'));
            setLogEndDate(end.format('YYYY-MM-DD'));
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

        if (!selectedAccommodationId || !selectRoom || !selectRateplan) {
            alert("Please select an accommodation.");
            console.log("accommodation", selectRoom);
            return;
        }

        if ((P_LogStartDate && !P_LogEndDate) || (!P_LogStartDate && P_LogEndDate)) {
            alert("Please select both Start and End dates.");
            return;
        }

        if ((P_StartDate && !P_EndDate) || (!P_StartDate && P_EndDate)) {
            alert("Please select both Start and End dates.");
            return;
        }
        // ✅ Valid in both cases: only accommodation OR all three fields
        await RateInventory(selectedAccommodationId, P_StartDate, P_EndDate, selectRoom, P_LogStartDate, P_LogEndDate, selectRateplan);
    }

    useEffect(() => {
        RoomList();
        RateplanList();
        RateInventory();
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
                                                        width: '468px', // fix width here
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

                                        <div className="col-4">
                                            <label>Rooms</label>
                                            <select
                                                className='form-control'
                                                value={selectRoom}
                                                onChange={(e) => {
                                                    const roomId = e.target.value;
                                                    setselectRoom(roomId);

                                                    // Check if both roomId and selectedAccommodationId are available
                                                    if (roomId && selectedAccommodationId) {
                                                        Rateplan(selectedAccommodationId, roomId, 0);
                                                    }
                                                }}
                                            >
                                                <option value="">Select Room</option>
                                                {room && room.length > 0 && room.map((room, index) => (
                                                    <option key={index} value={room.roomId}>
                                                        {room.roomName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-4">
                                            <label>RatePlan</label>
                                            <select className='form-control' value={selectRateplan} onChange={(e) => setselectRateplan(e.target.value)}>
                                                <option value="">RatePlan Select</option>
                                                {rateplan && rateplan.length > 0 && rateplan.map((rateplan, index) => (
                                                    <option key={index} value={rateplan.ratePlanId}>
                                                        {rateplan.ratePlanName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-4">
                                            <label htmlFor="dateRangePicker">Log Date</label>
                                            <input type="text" id="dateRangePicker" className="form-control" onChange={handleChangess} />
                                            <input type="hidden" value={P_StartDate} />
                                            <input type="hidden" value={P_EndDate} />
                                        </div>

                                        <div className="col-4">
                                            <label htmlFor="dateRangePicker2">InventoryLog Date</label>
                                            <input type="text" id="dateRangePicker2" className="form-control" onChange={handleChangess} />
                                            <input type="hidden" value={P_LogStartDate} />
                                            <input type="hidden" value={P_LogEndDate} />
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
                                            <th>Pre_RoomName</th>
                                            <th>Pre_RatePlanName</th>
                                            <th>New_RatePlanName</th>
                                            <th>MultiLanguageName</th>
                                            <td>InventoryDate</td>
                                            <th>Pre_MinStay</th>
                                            <th>New_MinStay</th>
                                            <th>Pre_MaxStay</th>
                                            <th>New_MaxStay</th>
                                            <th>Pre_Rates</th>
                                            <th>New_Rates</th>
                                            <th>Pre_Stopsell</th>
                                            <th>New_Stopsell</th>
                                            <th>Pre_Status</th>
                                            <th>New_Status</th>
                                            <th>Pre_GoogleAddsStatus</th>
                                            <th>New_GoogleAddsStatus</th>
                                            <th>Pre_CloseToArrival</th>
                                            <th>New_CloseToArrival</th>
                                            <th>Pre_CloseToDeparture</th>
                                            <th>New_CloseToDeparture</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rateinventory && rateinventory.length > 0 ? (
                                            rateinventory.map((item, index) => (
                                                <tr key={index}>
                                                    <td style={{ whiteSpace: "nowrap" }}>{item.logDate}</td>
                                                    <td style={{ whiteSpace: "nowrap" }}>{item.logDateLocal}</td>
                                                    <td>{item.pre_UserName}</td>
                                                    <td>{item.new_UserName}</td>
                                                    <td>{item.accommodationId}</td>
                                                    <td>{item.accommodationName}</td>
                                                    <td>{item.pre_RoomName}</td>
                                                    <td>{item.pre_RatePlanName}</td>
                                                    <td>{item.new_RatePlanName}</td>
                                                    <td>{item.multiLanguageName}</td>
                                                    <td>{item.inventoryDate}</td>
                                                    <td>{item.pre_MinStay}</td>
                                                    <td>{item.new_MinStay}</td>
                                                    <td>{item.pre_MaxStay}</td>
                                                    <td>{item.new_MaxStay}</td>
                                                    <td>{item.pre_Rates}</td>
                                                    <td>{item.new_Rates}</td>
                                                    <td>{item.pre_Stopsell}</td>
                                                    <td>{item.new_Stopsell}</td>
                                                    <td>{item.pre_Status}</td>
                                                    <td>{item.new_Status}</td>
                                                    <td>{item.pre_GoogleAddsStatus}</td>
                                                    <td>{item.new_GoogleAddsStatus}</td>
                                                    <td>{item.pre_CloseToArrival}</td>
                                                    <td>{item.new_CloseToArrival}</td>
                                                    <td>{item.pre_CloseToDeparture}</td>
                                                    <td>{item.new_CloseToDeparture}</td>
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

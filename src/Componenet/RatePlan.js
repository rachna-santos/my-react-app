import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../Context/ProductContext';
import $ from 'jquery';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';
import "datatables.net";

export default function RatePlan() {

    const context = useContext(ProductContext)
    const { AccommodationList, accommodationsearch, SelectRooms, room, RoomList, Rateplan, rateplan, RateplanList, rateplanlist } = context
    const [selectedAccommodationId, setSelectedAccommodationId] = useState('');
    const [P_StartDate, setStartDate] = useState('');
    const [P_EndDate, setEndDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectRoom, setselectRoom] = useState('');
    const [selectRateplan, setselectRateplan] = useState('');
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
      
         if (!selectedAccommodationId || !selectRoom || !selectRateplan) {
             alert("Please select an accommodation.");
            console.log("accommodation", selectRoom);
            return;
         }

        if ((P_StartDate && !P_EndDate) || (!P_StartDate && P_EndDate)) {
            alert("Please select both Start and End dates.");
            return;
        }
        // ✅ Valid in both cases: only accommodation OR all three fields
        await RateplanList(selectedAccommodationId, P_StartDate, P_EndDate, selectRoom, selectRateplan);
    }

    useEffect(() => {
        RoomList();
        RateplanList();
    }, [])

    useEffect(() => {
        if (rateplanlist.length > 0) {
          // Wait for DOM update
          setTimeout(() => {
            $('#dataTable').DataTable({
              destroy: true, // important to prevent reinitialization errors
            });
          }, 0);
        }
      }, [rateplanlist]);

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

                                        <div className="col-6">
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

                                        <div className="col-3">
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

                                        {/* <div className="col-3">
                                            <label>Rooms</label>
                                            <select className='form-control' value={selectRoom} onChange={(e) => setselectRoom(e.target.value)}>
                                                <option value="">Select Room</option>
                                                {room && room.length > 0 && room.map((room, index) => (
                                                    <option key={index} value={room.roomId}>
                                                        {room.roomName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div> */}

                                        <div className="col-3">
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
                                            <th>RatePlanName</th>
                                            <th>Pre_BookingWindowFrom</th>
                                            <th>New_BookingWindowFrom</th>
                                            <th>Pre_BookingWindowTo</th>
                                            <th>New_BookingWindowTo</th>
                                            <th>Pre_GuestQuantity</th>
                                            <th>New_GuestQuantity</th>
                                            <th>Pre_DefaultMinStay</th>
                                            <th>New_DefaultMinStay</th>
                                            <th>Pre_DefaultMaxStay</th>
                                            <th>New_DefaultMaxStay</th>
                                            <th>Pre_DefaultRates</th>
                                            <th>New_DefaultRates</th>
                                            <th>Pre_OnRequest</th>
                                            <th>New_OnRequest</th>
                                            <th>CreateDate</th>
                                            <th>Pre_LastModified</th>
                                            <th>New_LastModified</th>
                                            <th>Pre_StatusName</th>
                                            <th>New_StatusName</th>
                                            <th>Pre_Web</th>
                                            <th>New_Web</th>
                                            <th>Pre_Mobile</th>
                                            <th>New_Mobile</th>
                                            <th>Pre_Tablet</th>
                                            <th>New_Tablet</th>
                                            <th>Pre_Registerd_User</th>
                                            <th>New_Registerd_User</th>
                                            <th>Pre_CRS</th>
                                            <th>New_CRS</th>
                                            <th>Pre_MobileApp</th>
                                            <th>New_MobileApp</th>
                                            <th>Pre_Hightlight</th>
                                            <th>New_Hightlight</th>
                                            <th>Pre_Included</th>
                                            <th>New_Included</th>
                                            <th>Pre_IsLoyalty</th>
                                            <th>New_IsLoyalty</th>
                                            <th>Pre_RateCode</th>
                                            <th>New_RateCode</th>
                                            <th>ChildQuantity</th>
                                            <th>Pre_Adult</th>
                                            <th>New_Adult</th>
                                            <th>Pre_DisplayRatePlanName</th>
                                            <th>New_DisplayRatePlanName</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rateplanlist && rateplanlist.length > 0 ? (
                                            rateplanlist.map((item, index) => (
                                                <tr key={index}>
                                                    <td style={{ whiteSpace: "nowrap" }}>{item.logDate}</td>
                                                    <td style={{ whiteSpace: "nowrap" }}>{item.logDateLocal}</td>
                                                    <td>{item.Pre_userName}</td>
                                                    <td>{item.New_userName}</td>
                                                    <td>{item.accommodationId}</td>
                                                    <td>{item.accommodationName}</td>
                                                    <td>{item.roomName}</td>
                                                    <td>{item.ratePlanName}</td>
                                                    <td>{item.pre_BookingWindowFrom}</td>
                                                    <td>{item.new_BookingWindowFrom}</td>
                                                    <td>{item.pre_BookingWindowTo}</td>
                                                    <td>{item.new_BookingWindowTo}</td>
                                                    <td>{item.pre_GuestQuantity}</td>
                                                    <td>{item.new_GuestQuantity}</td>
                                                    <td>{item.pre_DefaultMinStay}</td>
                                                    <td>{item.new_DefaultMinStay}</td>
                                                    <td>{item.pre_DefaultMaxStay}</td>
                                                    <td>{item.new_DefaultMaxStay}</td>
                                                    <td>{item.pre_DefaultRates}</td>
                                                    <td>{item.new_DefaultRates}</td>
                                                    <td>{item.pre_OnRequest}</td>
                                                    <td>{item.new_OnRequest}</td>
                                                    <td>{item.createDate}</td>
                                                    <td>{item.pre_LastModified}</td>
                                                    <td>{item.new_LastModified}</td>
                                                    <td>{item.pre_StatusName}</td>
                                                    <td>{item.new_StatusName}</td>
                                                    <td>{item.pre_Web}</td>
                                                    <td>{item.new_Web}</td>
                                                    <td>{item.pre_Mobile}</td>
                                                    <td>{item.new_Mobile}</td>
                                                    <td>{item.pre_Tablet}</td>
                                                    <td>{item.new_Tablet}</td>
                                                    <td>{item.pre_Registerd_User}</td>
                                                    <td>{item.new_Registerd_User}</td>
                                                    <td>{item.pre_CRS}</td>
                                                    <td>{item.new_CRS}</td>
                                                    <td>{item.pre_MobileApp}</td>
                                                    <td>{item.new_MobileApp}</td>
                                                    <td>{item.pre_Hightlight}</td>
                                                    <td>{item.new_Hightlight}</td>
                                                    <td>{item.pre_Included}</td>
                                                    <td>{item.new_Included}</td>
                                                    <td>{item.pre_IsLoyalty}</td>
                                                    <td>{item.new_IsLoyalty}</td>
                                                    <td>{item.pre_RateCode}</td>
                                                    <td>{item.new_RateCode}</td>
                                                    <td>{item.childQuantity}</td>
                                                    <td>{item.pre_Adult}</td>
                                                    <td>{item.new_Adult}</td>
                                                    <td>{item.pre_DisplayRatePlanName}</td>
                                                    <td>{item.new_DisplayRatePlanName}</td>
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

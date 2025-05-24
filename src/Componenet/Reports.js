import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../Context/ProductContext';
import $ from 'jquery';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';
import 'datatables.net-bs4'; // DataTables with Bootstrap 4 styling
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

export default function Reports() {
    const context = useContext(ProductContext)
    const { GetAccommodation, accommodation, Reportingdata, reporting } = context
    const [selectedAccommodationId, setSelectedAccommodationId] = useState('');
    const [P_ByFilter, setP_ByFilter] = useState('');
    const [P_StartDate, setStartDate] = useState('');
    const [P_EndDate, setEndDate] = useState('');

    const handleChange = async (e) => {
        const accommodationId = e.target.value;
        setSelectedAccommodationId(accommodationId);
        localStorage.setItem("selectedAccommodationId", setSelectedAccommodationId)
    }

    const handleChanges = (e) => {
        setP_ByFilter(e.target.value);
        localStorage.setItem("P_StartDate", setP_ByFilter)


    }

    const handleChangess = (e) => {
        setStartDate(e.target.value);
        setEndDate(e.target.value);
        localStorage.setItem("P_StartDate", setStartDate)
        localStorage.setItem("P_EndDate", setEndDate)

    }
    // setaccommodation
    useEffect(() => {
        GetAccommodation();
        const savedAccommodationId = localStorage.getItem("selectedAccommodationId");
        const savedStartDate = localStorage.getItem("P_StartDate");
        const savedEndDate = localStorage.getItem("P_EndDate");
        const savedByFilter = localStorage.getItem("P_ByFilter");

        if (savedAccommodationId && savedStartDate && savedEndDate && savedByFilter) {
            setSelectedAccommodationId(savedAccommodationId);
            setStartDate(savedStartDate);
            setEndDate(savedEndDate);
            setP_ByFilter(savedByFilter);

            // Call Reportingdata with saved values
            Reportingdata(savedAccommodationId, savedStartDate, savedEndDate, savedByFilter);
        }
    }, []);
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

    const SubmitData = async (e) => {
        e.preventDefault();

        if (!selectedAccommodationId || !P_StartDate || !P_EndDate || !P_ByFilter) {
            alert("Please select all fields.");
            console.log("accommodation", selectedAccommodationId);
            console.log("P_StartDate", P_StartDate);
            console.log("P_EndDate", P_EndDate);
            console.log("P_ByFilter", P_ByFilter);
            return;
        }
        await Reportingdata(selectedAccommodationId, P_StartDate, P_EndDate, P_ByFilter);
    };

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="col-md-12">
                        <form onSubmit={SubmitData}>
                            <div className="row">
                                <div className="col-6 col-md-3 mb-2 mx-auto">
                                    <label htmlFor="dateRangePicker">Date Range</label>
                                    <input type="text" id="dateRangePicker" className="form-control" onChange={handleChangess} />
                                    <input type="hidden" value={P_StartDate} />
                                    <input type="hidden" value={P_EndDate} />
                                </div>
                                <div className="col-6 col-md-3 mb-2 mx-auto">
                                    <label>DateFilter</label>
                                    <select className="form-control" value={P_ByFilter} onChange={handleChanges}>
                                        <option value="" disabled selected>Select DateFilter</option>
                                        <option value="1">Create-Date</option>
                                        <option value="2">Check-In</option>
                                        <option value="3">Check-Out</option>
                                    </select>
                                </div>
                                <div className="col-6 col-md-3 mb-2 mx-auto">
                                    <label>AccommodationName</label>
                                    <select className="form-control" value={selectedAccommodationId} onChange={handleChange}>
                                        <option value="">Select Accommodation</option>
                                        {accommodation.map((pro, i) => (
                                            <option key={pro.accommodationId || i} value={pro.accommodationId}>
                                                {pro.accommodationName}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className="col-2">
                                    <button type="submit" className="btn btn-primary" id="searchButton" style={{ marginTop: "30px" }}>
                                        <i className="ti-save-alt" style={{ color: "white" }}></i> Search
                                    </button>
                                </div>

                                {/* <div class="col-3">
                                                            <select type="text" class="form-control" style="border-radius:5px;">
                                                            <option>Day1</option>
                                                            <option>Day2</option>
                                                            <option>Day4</option>
                                                            <option>Day5</option>
                                                            <option>Day6</option>
                                                            </select>
                                                            </div> */}

                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <br />
            
            <div className="container-fluid">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">BookingDate</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-wrapper" style={{ position: "relative" }}>
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" style={{ width: "100%" }}>
                                    <thead>
                                        <tr style={{ fontSize: "10px" }}>
                                            <th>AccommodationId</th>
                                            <th>BookingId</th>
                                            <th>BookingDate</th>
                                            <th >BeginDate</th>
                                            <th>EndDate</th>
                                            <th>TotalPrice</th>
                                            <th>BookingCurrencyId</th>
                                            <th>BookingSource</th>
                                            <th>BookingStatusId</th>
                                            <th>CreateDate</th>
                                            <th>StatusId</th>
                                            <th>StatusName</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            reporting.length > 0 &&
                                            reporting.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>{item.accommodationId}</td>
                                                        <td>{item.bookingId}</td>
                                                        <td style={{ whiteSpace: "nowrap" }}>{item.bookingDate}</td>
                                                        <td style={{ whiteSpace: "nowrap" }}>{item.beginDate}</td>
                                                        <td style={{ whiteSpace: "nowrap" }}>{item.endDate}</td>
                                                        <td>{item.totalPrice}</td>
                                                        <td>{item.bookingCurrencyId}</td>
                                                        <td>{item.bookingSource}</td>
                                                        <td>{item.bookingStatusId}</td>
                                                        <td>{item.createDate}</td>
                                                        <td>{item.statusId}</td>
                                                        <td>{item.statusName}</td>
                                                    </tr>
                                                )
                                            })
                                        }
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

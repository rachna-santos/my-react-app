import React, { useContext, useEffect, useState, useRef } from 'react'
import ProductContext from '../Context/ProductContext';
import $ from 'jquery';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';
import "datatables.net";
//  import 'datatables.net-bs4'; // DataTables with Bootstrap 4 styling
//  import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

export default function AccommodationList() {

    const context = useContext(ProductContext)
    const { GetAccommodation, accommodation, Reportingdata, reporting, setreporting, AccommodationList, accommodationsearch, getaccommodationsearch, GetAccommodationList } = context
    const [selectedAccommodationId, setSelectedAccommodationId] = useState('');
    const [P_StartDate, setStartDate] = useState('');
    const [P_EndDate, setEndDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
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

    const handleSelect = (item) => {
        setSearchText(item.accommodationIdName);
        setSelectedAccommodationId(item.accommodationId);
        setShowDropdown(false);
    };
    const Formsubmit = async (e) => {
        e.preventDefault();
    
        // Case: No accommodation selected → always invalid
        if (!selectedAccommodationId) {
            alert("Please select an accommodation.");
            return;
        }
    
        // Case: Accommodation is selected but one date is missing → invalid
        if ((P_StartDate && !P_EndDate) || (!P_StartDate && P_EndDate)) {
            alert("Please select both Start and End dates.");
            return;
        }
    
        // ✅ Valid in both cases: only accommodation OR all three fields
        await GetAccommodationList(selectedAccommodationId, P_StartDate, P_EndDate);
    } 
    useEffect(()=>{

        GetAccommodationList();
    },[])

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
                                                <ul className="list-group position-absolute w-100" style={{ zIndex: 999 }}>
                                                    {accommodationsearch.map((item) => (
                                                        <li
                                                            key={item.accommodationId}
                                                            className="list-group-item list-group-item-action"
                                                            onClick={() => handleSelect(item)}
                                                            style={{ cursor: 'pointer', width: '468px' }}
                                                        >
                                                            {item.accommodationIdName}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div className="col-6 col-md-3">
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
                            <h6 className="m-0 font-weight-bold text-primary">Accommodation List</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%">
                                    <thead>
                                        <tr style={{ fontSize: "10px" }}>
                                            <th>AccommodationId</th>
                                            <th>LogDate</th>
                                            <th>O_UserName</th>
                                            <th>N_UserName</th>
                                            <th>O_AccommodationName</th>
                                            <th>N_AccommodationName</th>
                                            <th>O_CityName</th>
                                            <th>O_CountryName</th>
                                            <th>O_CurrencyName</th>
                                            <th>N_CurrencyName</th>
                                            <th>O_TotalRooms</th>
                                            <th>N_TotalRooms</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                    {getaccommodationsearch && getaccommodationsearch.length > 0 ? (
                                        getaccommodationsearch.map((item,index) => (
                                                        <tr key={index}>
                                                            <td>{item.accommodationId}</td>
                                                            <td style={{ whiteSpace: "nowrap" }}>{item.logDate}</td>
                                                            <td>{item.o_UserName}</td>
                                                            <td>{item.n_UserName}</td>
                                                            <td>{item.o_accommodationName}</td>
                                                            <td>{item.n_accommodationName}</td>
                                                            <td>{item.o_CityName}</td>
                                                            <td>{item.o_CountryName}</td>
                                                            <td>{item.o_CurrencyName}</td>
                                                            <td>{item.n_CurrencyName}</td>
                                                            <td>{item.o_TotalRooms}</td>
                                                            <td>{item.n_TotalRooms}</td>
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

import React, { useState } from 'react'
import ProductContext from "./ProductContext"


export default function ProductState(props) {

    const [accommodation, setaccommodation] = useState([])
    const [Calander, setCalander] = useState([])
    const [key, setkey] = useState([])
    const [bar, setbar] = useState([])
    const [reporting, setreporting] = useState([])
    const [accommodationsearch, setaccommodationsearch] = useState([])
    const [getaccommodationsearch, setgetaccommodationsearch] = useState([])
    const [room, setroom] = useState([])
    const [roomlist, setroomlist] = useState([])
    const [rateplan, setrateplan] = useState([])
    const [rateplanlist, setrateplanlist] = useState([])
    const [roominventory, setroominventory] = useState([])
    const [rateinventory, setrateinventory] = useState([])

    const GetAccommodation = async () => {
        const token = sessionStorage.getItem('token');
        const P_UserId = sessionStorage.getItem('Id');

        try {
            const response = await fetch(`https://localhost:44380/api/Home/Accommodation?P_UserId=${P_UserId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("json", json);
            setaccommodation(json);

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };

    const GetCalander = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch("https://localhost:44380/api/Home/Calander", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("json", json);
            setCalander(json);

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };
    // piechart
    const GetKeyIndicator = async (accommodationId, calanderId) => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await fetch(`https://localhost:44380/api/Home/Reportinglist?P_AccommodationId=${accommodationId}&P_CalendarId=${calanderId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("fetch data in json", json);
            GetBarChart(accommodationId);
            setkey(json);
            return json;

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
            return [];

        }
    };

    // barchart
    const GetBarChart = async (accommodationId) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:44380/api/Home/BarchartData?P_AccommodationId=${accommodationId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("bar chart data feth", json);
            setbar(json);
            return json;

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
            return [];
        }
    };


    const Reportingdata = async (accommodationId, P_StartDate, P_EndDate, P_ByFilter) => {
        const token = sessionStorage.getItem('token');
        const P_UserId = sessionStorage.getItem('Id');

        try {
            const response = await fetch(`https://localhost:44380/api/Home/Reporting?P_AccommodationId=${accommodationId}&P_StartDate=${P_StartDate}&P_EndDate=${P_EndDate}&P_ByFilter=${P_ByFilter}&P_UserId=${P_UserId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("reporting data", json);
            setreporting(json);
            sessionStorage.setItem("reportingData", JSON.stringify(json));

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };


    const AccommodationList = async (P_GSearch) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:44380/api/Home/AccommodationList?P_GSearch=${P_GSearch}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("accommodation data", json);
            setaccommodationsearch(json);

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }


    };

    const GetAccommodationList = async (AccommodationId, P_LogStartDate, P_LogEndDate) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:44380/api/Home/getAccommodationlist?P_AccommodationId=${AccommodationId}&P_LogStartDate=${P_LogStartDate}&P_LogEndDate=${P_LogEndDate}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("accommodation data", json);
            setgetaccommodationsearch(json);
            sessionStorage.setItem("accommodation", JSON.stringify(json));

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };

    const SelectRooms = async (AccommodationId, RoomId) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:44380/api/Home/DropdownRooms?P_AccommodationId=${AccommodationId}&P_RoomId=${RoomId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("Rooms data", json);
            setroom(json);
        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };

    const RoomList = async (AccommodationId, P_StartDate, P_EndDate, RoomId) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:44380/api/Home/RoomList?P_AccommodationId=${AccommodationId}&P_LogStartDate=${P_StartDate}&P_LogEndDate=${P_EndDate}&P_RoomId=${RoomId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("roomlist data", json);
            setroomlist(json);
        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };

    const Rateplan = async (AccommodationId, RoomId, Rateplanid) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:44380/api/Home/Rateplan?P_AccommodationId=${AccommodationId}&P_RoomId=${RoomId}&P_RatePlanId=${Rateplanid}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("rateplanlist data", json);
            setrateplan(json);
        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };

    const RateplanList = async (AccommodationId, P_LogStartDate, P_LogEndDate, Roomid, Ratepald) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:44380/api/Home/Rateplanlist?P_AccommodationId=${AccommodationId}&P_RoomId=${Roomid}&P_RatePlanId=${Ratepald}&P_LogStartDate=${P_LogStartDate}&P_LogEndDate=${P_LogEndDate}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("rateplan data", json);
            setrateplanlist(json);

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };

    const RoomInventory = async (AccommodationId, P_LogStartDate, P_LogEndDate, Roomid, P_StartDate, P_EndDate) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:44380/api/Home/Rateinventory?P_AccommodationId=${AccommodationId}&P_RoomId=${Roomid}&P_LogStartDate=${P_LogStartDate}&P_LogEndDate=${P_LogEndDate}&P_StartDate=${P_StartDate}&P_EndDate=${P_EndDate}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("rateplan data", json);
            setroominventory(json);

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };

    const RateInventory = async (AccommodationId, P_LogStartDate, P_LogEndDate, Roomid, P_StartDate, P_EndDate,Ratepalnid) => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`https://localhost:44380/api/Home/Inventorylog?P_LogStartDate=${P_LogStartDate}&P_LogEndDate=${P_LogEndDate}&P_StartDate=${P_StartDate}&P_EndDate=${P_EndDate}&P_AccommodationId=${AccommodationId}&P_RoomId=${Roomid}&P_RatePlanId=${Ratepalnid}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log("rateplan data", json);
            setrateinventory(json);

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
        }

    };
   
    return (
        <ProductContext.Provider value={{AccommodationList,Reportingdata,GetBarChart,GetKeyIndicator, GetCalander, GetAccommodation, SelectRooms, RoomList, Rateplan, RateplanList, RoomInventory, accommodation, Calander, key, bar, reporting, accommodationsearch, getaccommodationsearch, room, roomlist, rateplan, rateplanlist, roominventory,rateinventory, GetAccommodationList, setreporting,RateInventory,setgetaccommodationsearch}}>
            {props.children}
        </ProductContext.Provider>
    )
}

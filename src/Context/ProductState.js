import React, { useState } from 'react'
 import ProductContext from "./ProductContext"


export default function ProductState(props) {

  const [accommodation,setaccommodation]=useState([])
  const [Calander,setCalander]=useState([])
  const [key,setkey]=useState([])
  const [bar,setbar]=useState([])
  const [reporting,setreporting]=useState([])



  const GetAccommodation = async ()=>{
     const token = sessionStorage.getItem('token');
     const P_UserId = sessionStorage.getItem('Id');

    try {
        const response = await fetch(`https://localhost:44380/api/Home/Accommodation?P_UserId=${P_UserId}`,{
            method: 'GET',
            headers: {
            "Content-Type": "application/json",
             "Authorization":`Bearer ${token}`
            }
        });
        const json = await response.json();
        console.log("json",json);
        setaccommodation(json);  

    } catch (error) {
        console.error('Error fetching data:', error.message || error);
    }

  };

  const GetCalander = async ()=>{
     const token = sessionStorage.getItem('token');
    try {
        const response = await fetch("https://localhost:44380/api/Home/Calander",{
            method: 'GET',
            headers: {
            "Content-Type": "application/json",
             "Authorization":`Bearer ${token}`
            }
        });
        const json = await response.json();
        console.log("json",json);
        setCalander(json);  
      
    } catch (error) {
        console.error('Error fetching data:', error.message || error);
    }

  };
    // piechart
  const GetKeyIndicator = async (accommodationId,calanderId)=>{
     const token = sessionStorage.getItem('token');

      try {
          const response = await fetch(`https://localhost:44380/api/Home/Reportinglist?P_AccommodationId=${accommodationId}&P_CalendarId=${calanderId}`,{
              method: 'GET',
              headers: {
              "Content-Type": "application/json",
               "Authorization":`Bearer ${token}`
              }
          });
          const json = await response.json();
          console.log("fetch data in json",json);
          GetBarChart(accommodationId);         
          setkey(json);  
          return json;

      } catch (error) {
          console.error('Error fetching data:', error.message || error);
          return [];

      }
  };
  
    // barchart
  const GetBarChart = async (accommodationId)=>{
     const token = sessionStorage.getItem('token');
      try {
          const response = await fetch(`https://localhost:44380/api/Home/BarchartData?P_AccommodationId=${accommodationId}`,{
              method: 'GET',
              headers: {
              "Content-Type": "application/json",
               "Authorization":`Bearer ${token}`
              }
          });
          const json = await response.json();
          console.log("bar chart data feth",json);
          setbar(json);  
          return json;

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
            return [];
        }
  }; 


  const Reportingdata = async (accommodationId,P_StartDate,P_EndDate,P_ByFilter)=>{
    const token = sessionStorage.getItem('token');
    const P_UserId = sessionStorage.getItem('Id');

   try {
       const response = await fetch(`https://localhost:44380/api/Home/Reporting?P_AccommodationId=${accommodationId}&P_StartDate=${P_StartDate}&P_EndDate=${P_EndDate}&P_ByFilter=${P_ByFilter}&P_UserId=${P_UserId}`,{
           method: 'GET',
           headers: {
           "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
           }
       });
       const json = await response.json();
       console.log("reporting data",json);
       setreporting(json);  
       
   } catch (error) {
       console.error('Error fetching data:', error.message || error);
   }

 };
  
    return (
      <ProductContext.Provider value={{Reportingdata,GetBarChart,GetKeyIndicator,GetCalander,GetAccommodation,accommodation,Calander,key,bar,reporting}}>
        {props.children}
        </ProductContext.Provider>
    )
}

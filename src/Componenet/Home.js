import React, { useContext, useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import ProductContext from '../Context/ProductContext';
import { useNavigate } from 'react-router';

export default function Home() {
    const context=useContext(ProductContext)
    const{GetBarChart,GetKeyIndicator,GetAccommodation,GetCalander,accommodation,Calander,key,bar} = context
    const [selectedAccommodationId, setSelectedAccommodationId] = useState('');
    const [selectedCalanderId, setSelectedCalanderId] = useState('');
    const [keyData, setKeyData] = useState([]);
    let navigate=useNavigate();
    const token=sessionStorage.getItem("token");


    const handleChange = async (e) => {
        const accommodationId = e.target.value;
        setSelectedAccommodationId(accommodationId);  

        // Use currently selected calendar ID
        const calendarId = selectedCalanderId;
        console.log("Accommodation Changed - Using calendarId:", calendarId);
      
        if (calendarId) {
          const data = await GetKeyIndicator(accommodationId, calendarId);
          if (data) {
            setKeyData(data);
            updateChart(data);
          } else {
            console.log("No chart data available");
          }
        }
      };
      
      const handleChanges = async (e) => {
        const calendarId = e.target.value;
        setSelectedCalanderId(calendarId); 

        // Use currently selected accommodation ID
        const accommodationId = selectedAccommodationId;
        console.log("Calendar Changed - Using accommodationId:", accommodationId);   
        if (accommodationId) {
          const data = await GetKeyIndicator(accommodationId, calendarId);
          if (data) {
            setKeyData(data);
            updateChart(data);
          } else {
            console.log("No chart data available");
          }
        }
      };
  
      // piechart
      const updateChart = (apiData) => {
      
          // Log the data to check if the structure is as expected
          console.log("API Data:", apiData); 
          // null return
          if (!apiData || apiData.length === 0) {
            Highcharts.chart('container', {
              chart: {
                  type: 'pie'
              },
              title: {
                  text: 'Browser market shares. January, 2022'
              },
              subtitle: {
                  text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
              },
          
              accessibility: {
                  announceNewData: {
                      enabled: true
                  },
                  point: {
                      valueSuffix: '%'
                  }
              },
          
              plotOptions: {
                  pie: {
                      borderRadius: 5,
                      dataLabels: [{
                          enabled: true,
                          distance: 15,
                          format: '{point.name}'
                      }, {
                          enabled: true,
                          distance: '-30%',
                          filter: {
                              property: 'percentage',
                              operator: '>',
                              value: 5
                          },
                          format: '{point.y:.1f}%',
                          style: {
                              fontSize: '0.9em',
                              textOutline: 'none'
                          }
                      }]
                  }
              },
          
              tooltip: {
                  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                  pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' +
                      '<b>{point.y:.2f}%</b> of total<br/>'
              },
          
              series: [
                  {
                      name: 'TotalBooking',
                      colorByPoint: true,
                      data: [
                          {
                              name: 'Chrome',
                              y: 0.0,
                              drilldown: 'Chrome'
                          },
                          {
                              name: 'Safari',
                              y: 0.0,
                              drilldown: 'Safari'
                          },
                          {
                              name: 'Edge',
                              y: 0.0,
                              drilldown: 'Edge'
                          },
                          {
                              name: 'Firefox',
                              y: 0.0,
                              drilldown: 'Firefox'
                          },
                          {
                              name: 'Other',
                              y: 0.0,
                              drilldown: null
                          }
                      ]
                  }
              ],
              drilldown: {
                  series: [
                      {
                          name: 'TotalRevenu',
                          id: 'Chrome',
                          data: [
                              [
                                  'v0.0',
                                  0.0
                              ],
                              [
                                  'v96.0',
                                  0.0
                              ],
                              [
                                  'v95.0',
                                  0.0
                              ],
                              [
                                  'v94.0',
                                  0.0
                              ],
                              [
                                  'v93.0',
                                  0.0
                              ],
                              [
                                  'v92.0',
                                  0.0
                              ],
                              [
                                  'v91.0',
                                  0.0
                              ],
                              [
                                  'v90.0',
                                  0.0
                              ],
                              [
                                  'v89.0',
                                  0.0                            ],
                              [
                                  'v88.0',
                                  0.0
                              ],
                              [
                                  'v87.0',
                                  0.0
                              ],
                              [
                                  'v86.0',
                                  0.0
                              ],
                              [
                                  'v85.0',
                                  0.0
                              ],
                              [
                                  'v84.0',
                                  0.0
                              ],
                              [
                                  'v83.0',
                                  0.0
                              ],
                              [
                                  'v81.0',
                                  0.0
                              ],
                              [
                                  'v80.0',
                                  0.0
                              ],
                              [
                                  'v79.0',
                                  0.0
                              ],
                              [
                                  'v78.0',
                                  0.0
                              ],
                              [
                                  'v76.0',
                                  0.0
                              ],
                              [
                                  'v75.0',
                                  0.0
                              ],
                              [
                                  'v72.0',
                                  0.0
                              ],
                              [
                                  'v70.0',
                                  0.0
                              ],
                              [
                                  'v69.0',
                                  0.0
                              ],
                              [
                                  'v56.0',
                                  0.0
                              ],
                              [
                                  'v49.0',
                                  0.0
                              ]
                          ]
                      },
                      {
                          name: 'Safari',
                          id: 'Safari',
                          data: [
                              [
                                  'v15.3',
                                  0.1
                              ],
                              [
                                  'v15.2',
                                  2.01
                              ],
                              [
                                  'v15.1',
                                  2.29
                              ],
                              [
                                  'v15.0',
                                  0.49
                              ],
                              [
                                  'v14.1',
                                  2.48
                              ],
                              [
                                  'v14.0',
                                  0.64
                              ],
                              [
                                  'v13.1',
                                  1.17
                              ],
                              [
                                  'v13.0',
                                  0.13
                              ],
                              [
                                  'v12.1',
                                  0.16
                              ]
                          ]
                      },
                      {
                          name: 'Edge',
                          id: 'Edge',
                          data: [
                              [
                                  'v97',
                                  6.62
                              ],
                              [
                                  'v96',
                                  2.55
                              ],
                              [
                                  'v95',
                                  0.15
                              ]
                          ]
                      },
                      {
                          name: 'Firefox',
                          id: 'Firefox',
                          data: [
                              [
                                  'v96.0',
                                  4.17
                              ],
                              [
                                  'v95.0',
                                  3.33
                              ],
                              [
                                  'v94.0',
                                  0.11
                              ],
                              [
                                  'v91.0',
                                  0.23
                              ],
                              [
                                  'v78.0',
                                  0.16
                              ],
                              [
                                  'v52.0',
                                  0.15
                              ]
                          ]
                      }
                  ]
              }
          });
          
            return; // Exit early if data is missing or undefined
          }
        
          const kpi = apiData[0];  // Assuming the data is in the first element
          console.log("KPI Data:", kpi);
        
          // If kpi is undefined or missing essential properties, return early to avoid further errors
          if (!kpi || !kpi.totalBookings || !kpi.totalRevenue) {
            console.error("Essential KPI data is missing.");
            return;
          }
        
          // Proceed with the chart data preparation
          const chartData = [
            { name: 'Total Bookings', y: parseFloat(kpi.totalBookings) },
            { name: 'Total Revenue', y: parseFloat(kpi.totalRevenue) },
            { name: 'Occupancy', y: parseFloat(kpi.occupancy) },
            { name: 'Total Rooms', y: parseFloat(kpi.totalRooms) },
            { name: 'RevPAR', y: parseFloat(kpi.revPAR) },
            { name: 'Cancellation Rates', y: parseFloat(kpi.cancellationRates) },
          ];
        
          console.log("Chart Data:", chartData);
        
          // Continue with the chart rendering as before
          if (Highcharts.charts.length > 0 && Highcharts.charts[0]) {
            Highcharts.charts[0].destroy(); // Clean previous chart if needed
          }
        
          Highcharts.chart("container", {
            chart: {
              type: "pie",
            },
            title: {
              text: "Accommodation Stats",
            },
            tooltip: {
              pointFormat: "<b>{point.name}</b>: {point.y}", // Show actual value in tooltip
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                  enabled: true,
                  format: "<b>{point.name}</b>: {point.y}", // Display the actual 'y' value (not percentage)
                },
              },
            },
            series: [
              {
                name: "Share",
                colorByPoint: true,
                data: chartData, // Use the data with the actual values
              },
            ],
          });
        };
      
        // secoundchartbar
        useEffect(() => {
          if (key.accommodationId) {
            GetBarChart(key.accommodationId);
          }
        }, [key.accommodationId]);
      
        useEffect(() => {
          // Clear chart if no data
          if (!bar || bar.length === 0) {
            Highcharts.chart('container2', {
              title: { text: 'No data available' },
              series: []
            });
            return;
          }
        
          const months = [...new Set(bar.map(item => item.months))].sort((a, b) => new Date(a) - new Date(b));
          const sources = [...new Set(bar.map(item => item.bookingSource))];
        
          const bookingSeries = [];
          const revenueSeries = [];
        
          sources.forEach(source => {
            const bookings = [];
            const revenues = [];
        
            months.forEach(month => {
              const item = bar.find(x => x.months === month && x.bookingSource === source);
              bookings.push(item ? item.totalBookings : 0);
              revenues.push(item ? item.totalRevenue : 0);
            });
        
            bookingSeries.push({
              name: `Bookings - ${source}`,
              type: 'column',
              yAxis: 0,
              data: bookings,
              tooltip: {
                valueSuffix: ' bookings'
              }
            });
        
            revenueSeries.push({
              name: `Revenue - ${source}`,
              type: 'spline',
              yAxis: 1,
              data: revenues,
              tooltip: {
                valueSuffix: ' SAR'
              }
            });
          });
        
          Highcharts.chart('container2', {
            chart: { zooming: { type: 'xy' } },
            title: { text: 'Key Performance Indicators' },
            xAxis: [{ categories: months, crosshair: true }],
            yAxis: [
              { title: { text: 'Total Bookings' } },
              { title: { text: 'Total Revenue (SAR)' }, opposite: true }
            ],
            tooltip: { shared: true },
            legend: {
              layout: 'vertical',
              align: 'left',
              x: 80,
              verticalAlign: 'top',
              y: 55,
              floating: true,
              backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [...bookingSeries, ...revenueSeries]
          });
        
        }, [bar]);
        
  
      useEffect(() => {
        if (!token) {
          navigate("/login");
        } else {
          GetAccommodation(token);
          GetCalander(token);
          // GetKeyIndicator(token);
        }
      }, [token, navigate])

     
    return (
        <>
        <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-end gap-4">
                    {/* Accommodation Dropdown */}
                    <select
                        className="form-control w-auto" style={{marginRight:"10px"}}
                        value={selectedAccommodationId}
                        onChange={handleChange}>
                        <option value="">Select Accommodation</option>
                        {accommodation.map((pro, i) => (
                        <option key={pro.accommodationId || i} value={pro.accommodationId}>
                            {pro.accommodationName}
                        </option>
                        ))}
                    </select>

                    {/* Calendar Dropdown */}
                    <select
                        className="form-control w-auto" style={{marginRight:"12px"}}
                        value={selectedCalanderId}
                        onChange={handleChanges}
                    >
                        <option value="">Select Calendar</option>
                        {Calander.map((pro, i) => (
                        <option key={pro.calendarId || i} value={pro.calendarId}>
                            {pro.calendar}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>
        </div>

        <br/>

        <div className="container-fluid">
                    {/* showbooking */}
                        <div className="row">

                            <div className="col-xl-3 col-md-6 mb-4">
                            {Array.isArray(key) && key.map((total) => ( 
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    TotalBooking</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{total.totalBookings}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                            {Array.isArray(key) && key.map((Revenu) => ( 
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                TotalRevenue</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{Revenu.totalRevenue}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                            {Array.isArray(key) && key.map((occupancy) => ( 
                                <div className="card border-left-info shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">occupancy
                                                </div>
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col-auto">
                                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{occupancy.occupancy}</div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="progress progress-sm mr-2">
                                                            <div className="progress-bar bg-info" role="progressbar"
                                                                style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0"
                                                                aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                            {Array.isArray(key) && key.map((totalRoom) => ( 
                                <div className="card border-left-warning shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                TotalRooms</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{totalRoom.totalRooms}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* showchartdata */}
                        <div className="row">

                            <div className="col-xl-6 col-lg-7">
                                <div className="card shadow mb-4">
                                    <div
                                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Key Indicator</h6>                             
                                    </div>
                                    <div className="card-body">
                                    <figure className="highcharts-figure">
                                    <div id="container"></div>                            
                                    </figure>
                                    </div>
                                </div>
                            </div>
                            {/* chart */}
                            <div className="col-xl-6 col-lg-5">
                                <div className="card shadow mb-4">
                                    <div
                                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Key Indicator</h6>                             
                                    </div>
                                    <div className="card-body">       
                                            <figure class="highcharts-figure">
                                                <div id="container2"></div>                                      
                                            </figure> 
                                        <div className="mt-4 text-center small">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-lg-6 mb-4">

                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="small font-weight-bold">Server Migration <span
                                            className="float-right">20%</span></h4>
                                        <div className="progress mb-4">
                                            <div className="progress-bar bg-danger" role="progressbar" style={{ width: "20%" }}
                                                aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <h4 className="small font-weight-bold">Sales Tracking <span
                                            className="float-right">40%</span></h4>
                                        <div className="progress mb-4">
                                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: "40%" }}
                                                aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <h4 className="small font-weight-bold">Customer Database <span
                                            className="float-right">60%</span></h4>
                                        <div className="progress mb-4">
                                            <div className="progress-bar" role="progressbar" style={{ width: "60%" }}
                                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <h4 className="small font-weight-bold">Payout Details <span
                                            className="float-right">80%</span></h4>
                                        <div className="progress mb-4">
                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: "80%" }}
                                                aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <h4 className="small font-weight-bold">Account Setup <span
                                            className="float-right">Complete!</span></h4>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: "100%" }}
                                                aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6 mb-4">
                                        <div className="card bg-primary text-white shadow">
                                            <div className="card-body">
                                                Primary
                                                <div className="text-white-50 small">#4e73df</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <div className="card bg-success text-white shadow">
                                            <div className="card-body">
                                                Success
                                                <div className="text-white-50 small">#1cc88a</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <div className="card bg-info text-white shadow">
                                            <div className="card-body">
                                                Info
                                                <div className="text-white-50 small">#36b9cc</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <div className="card bg-warning text-white shadow">
                                            <div className="card-body">
                                                Warning
                                                <div className="text-white-50 small">#f6c23e</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <div className="card bg-danger text-white shadow">
                                            <div className="card-body">
                                                Danger
                                                <div className="text-white-50 small">#e74a3b</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <div className="card bg-secondary text-white shadow">
                                            <div className="card-body">
                                                Secondary
                                                <div className="text-white-50 small">#858796</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <div className="card bg-light text-black shadow">
                                            <div className="card-body">
                                                Light
                                                <div className="text-black-50 small">#f8f9fc</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <div className="card bg-dark text-white shadow">
                                            <div className="card-body">
                                                Dark
                                                <div className="text-white-50 small">#5a5c69</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-6 mb-4">

                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "25rem" }}
                                                src="Admin/img/undraw_posting_photo.svg" alt="..." />
                                        </div>
                                        <p>Add some quality, svg illustrations to your project courtesy of <a
                                            target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a
                                            constantly updated collection of beautiful svg images that you can use
                                            completely free and without attribution!</p>
                                        <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on
                                            unDraw &rarr;</a>
                                    </div>
                                </div>


                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
                                    </div>
                                    <div className="card-body">
                                        <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classNamees in order to reduce
                                            CSS bloat and poor page performance. Custom CSS classNamees are used to create
                                            custom components and custom utility classNamees.</p>
                                        <p className="mb-0">Before working with this theme, you should become familiar with the
                                            Bootstrap framework, especially the utility classNamees.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

        </div>
           
        </>
    )
}

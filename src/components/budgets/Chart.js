/**
 * This is in case in the future if I want to use this chart to make a cooler looking budget card
 */
// import React, { Component } from "react";
// //  must also install apexcharts";
// // npm install react-apexcharts apexcharts --save
// import Chart from "react-apexcharts";

// class MyChart extends Component {
//   constructor(props) {
//     super(props);

//     //see https://apexcharts.com/docs/options/plotoptions/radialbar/
//     this.state = {
//       series: [30.33],
//       options: {
//         chart: {
//           type: "radialBar",
//           offsetY: -20,
//           sparkline: {
//             enabled: true
//           }
//         },
//         plotOptions: {
//           radialBar: {
//             startAngle: -130,
//             endAngle: 130,
//             track: {
//               background: "#66eeaa",
//               strokeWidth: "97%",
//               margin: 5, // margin is in pixels
//               dropShadow: {
//                 enabled: true,
//                 top: 2,
//                 left: 0,
//                 color: "#999",
//                 opacity: 1,
//                 blur: 2
//               }
//             },
//             dataLabels: {
//               name: {
//                 show: true,
//                 fontSize: "0.7em",
//                 offsetY: -10,
//                 color:"red"
//               },
//               value: {
//                 offsetY: -2,
//                 fontSize: "1em",
//                 color:"red",
//                 formatter: function (val) {
//                   return val + '$'
//                 },
//                 total: {
//                   show: true,
//                   label: 'Total',
//                   color: 'green',
//                   fontSize: '16px',
//                   fontFamily: undefined,
//                   fontWeight: 600,
//                   formatter: function (w) {
//                     return "some"
                      
//                   }
//                 }
//               }
//             }
//           }
//         },
//         grid: {
//           padding: {
//             top: -10
//           }
//         },
//         fill: {
//           colors: "#553377",
//   opacity: 0.5,
//   type: 'solid',
//         },
//         labels: ["Average Results","heelo"]
//       }
//     };
//   }

//   render() {
//     return (
//       <div id="chart">
//         <Chart
//           options={this.state.options}
//           series={this.state.series}
//           type="radialBar"
//         />
//       </div>
//     );
//   }
// }

// export default MyChart;

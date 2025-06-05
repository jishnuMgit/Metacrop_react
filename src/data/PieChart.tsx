import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardHeader, CardBody, CardFooter, Typography } from '@material-tailwind/react'

    export  const ApexChart = () => {
        const [state, setState] = useState({
          
            series: [44, 55, 13, 43, 22],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          
          
        });

        

        return (
         

          <Card className="border border-blue-gray-100 shadow-sm dark:bg-dark-primary-bg dark:border-none">
      <CardHeader
        className="dark:bg-dark-primary-bg"
        variant="gradient"
        // color={color}
        floated={false}
        shadow={false}
      >
         <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="pie" width={380} />
              </div>
            <div id="html-dist"></div>
          </div>
        
      </CardHeader>
     
      
     
    </Card>
        );
      }

   
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

// ✅ Define the prop type
type ChartItem = {
  label: string;
  value: number;
};

interface ApexChartProps {
  data: ChartItem[];
  description?: string;
}

export const ApexChart: React.FC<ApexChartProps> = ({ data = [], description }) => {
  const [state, setState] = useState({
    series: [] as number[],
    options: {
      chart: {
        width: 380,
        type: "pie" as const,
      },
      labels: [] as string[],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom" as const,
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setState({
        series: data.map((item) =>
          typeof item.value === "number" ? Number(item.value.toFixed(2)) : 0
        ),
        options: {
          ...state.options,
          labels: data.map((item) => item.label ?? "Unknown"),
        },
      });
    }
  }, [data]);

  return (
    <Card className="border border-blue-gray-100 shadow-sm dark:bg-dark-primary-bg dark:border-none">
      <CardHeader
        className="dark:bg-dark-primary-bg p-4"
        variant="gradient"
        floated={false}
        shadow={false}
      >
        <Typography variant="h6" color="blue-gray" className="dark:text-white">
          {description}
        </Typography>
      </CardHeader>
      <CardBody className="flex justify-center items-center">
        {state.series.length > 0 ? (
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="pie"
            width={380}
          />
        ) : (
          <Typography
            variant="paragraph"
            className="text-center text-gray-500 dark:text-gray-400"
          >
            No data available
          </Typography>
        )}
      </CardBody>
    </Card>
  );
};

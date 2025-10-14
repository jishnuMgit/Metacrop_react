import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

type ChartItem = {
  label: string;
  value: number;
};

interface ApexChartProps {
  data: ChartItem[];
  description?: string;
}

export const ApexChart: React.FC<ApexChartProps> = ({ data = [], description }) => {
  const [isDark, setIsDark] = useState(false);
  const [state, setState] = useState({
    series: [] as number[],
    options: {
      chart: {
        width: 380,
        type: "pie" as const,
      },
      labels: [] as string[],
      legend: {
        position: "bottom" as const,
        fontSize: "14px",
        markers: {
          width: 0, // Hide default circle marker
          height: 0,
        },
        labels: {
          colors: [] as string[],
          useSeriesColors: false,
        },
        formatter: (seriesName: string, opts: any) => {
          const value = opts.w.globals.series[opts.seriesIndex];
          return `
            <div class="flex items-center justify-center gap-2">
              <span class="chip ${
                isDark ? "chip-dark" : "chip-light"
              }">${seriesName}: ${value}</span>
            </div>`;
        },
      },
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
    // Detect dark mode dynamically
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(darkMode);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

useEffect(() => {
  if (data && data.length > 0) {
    setState((prev) => ({
      ...prev,
      series: data.map((item) =>
        typeof item.value === "number" ? Number(item.value.toFixed(2)) : 0
      ),
      options: {
        ...prev.options,
        labels: data.map((item) => item.label ?? "Unknown"),
        legend: {
          ...prev.options.legend,
          labels: {
            colors: data.map(() => (isDark ? "#fff" : "#000")),
            useSeriesColors: false, // ✅ keep this to satisfy the type
          },
        },
      },
    }));
  }
}, [data, isDark]);

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
          <>
            <style>
              {`
                .apexcharts-legend-text {
                  display: flex !important;
                  justify-content: center !important;
                }
                .chip {
                  display: inline-block;
                  padding: 4px 10px;
                  border-radius: 9999px;
                  font-size: 13px;
                  font-weight: 500;
                  transition: all 0.3s ease;
                }
                .chip-light {
                  background-color: #f3f4f6;
                  color: #111827;
                  border: 1px solid #e5e7eb;
                }
                .chip-dark {
                  background-color: #374151;
                  color: #f9fafb;
                  border: 1px solid #4b5563;
                }
              `}
            </style>
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="pie"
              width={380}
            />
          </>
        ) : (
          <Typography
            variant="paragraph"
            className="text-center text-gray-200 dark:text-gray-200"
          >
            No data available
          </Typography>
        )}
      </CardBody>
    </Card>
  );
};

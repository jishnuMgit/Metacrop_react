import { useEffect, useState } from "react";
import { ApexChart } from "@/data/PieChart";
import { CreateAxiosDefaults } from "useipa";
import Env from "@/config/env";


const client: CreateAxiosDefaults= {
    baseURL: Env.VITE_BASE_URL,
    withCredentials: true,
  }
const ShowAttendancePie = () => {
  const [chartData, setChartData] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${client?.baseURL}/staff/GetAttendanceSummary`, {
          credentials: "include",
        });
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error("Error loading chart data", error);
      }
    };

    fetchData();
  }, []);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md dark:bg-dark-primary-bg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Team Attendance Overview
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Summary of attendance for today. Total entries: <strong>{total}</strong>
        </p>
      </div>

      <div>
        <ApexChart data={chartData} description="Attendance Distribution" />
      </div>

      <div className="mt-6 text-sm text-green-600 font-bold dark:text-gray-300">
        {chartData.map((item) => (
          <div key={item.label} className="flex gap-5">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAttendancePie;

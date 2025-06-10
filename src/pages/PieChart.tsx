import Env from '@/config/env';
import { ApexChart } from '@/data/PieChart';
import PiecartSkeleton from '@/skeletons/PiecartSkeleton';
import React, { useEffect, useState } from 'react';

const PieChart = () => {
  const [piedata, setpiedata] = useState<any>();
  const [piedata2, setpiedata2] = useState<any>();
  const [piedata3, setpiedata3] = useState<any>();
  const [loading, setLoading] = useState(true); // Added loading state

  const pieChartData = [
    {
      label: piedata?.Bank?.type,
      value: piedata?.Bank?.BankPer,
    },
    {
      label: piedata?.cash?.type,
      value: piedata?.cash?.CashPer,
    },
  ];

  const pieChartData2 = piedata2?.map((item: any) => ({
    label: item.itemName,
    value: Number(item.percentage),
  }));

  const pieChartData3 = piedata3?.map((item: any) => ({
    label: item.itemName,
    value: Number(item.percentage),
  }));

  const FetchPieData = async () => {
    try {
      const FetchBar = await fetch(`${Env.VITE_BASE_URL}/analytics/Piechart`, {
        method: 'GET',
        credentials: 'include',
      });

      const AllData = await FetchBar.json();
      setpiedata(AllData?.data);
      setpiedata2(AllData?.pieData);
      setpiedata3(AllData?.pieData1);
      setLoading(false); // Done loading
    } catch (error) {
      console.error("Failed to fetch pie data", error);
      setLoading(false); // Also stop loading on error
    }
  };

  useEffect(() => {
    FetchPieData();
  }, []);

  return (
    <>
      {loading ? (
        <PiecartSkeleton />
      ) : (
        <>
          <ApexChart description="Cash And Bank Revenue" data={pieChartData} />
          <ApexChart description="Top-Selling Items" data={pieChartData2} />
          <ApexChart description="Low-Selling Items" data={pieChartData3} />
        </>
      )}
    </>
  );
};

export default PieChart;

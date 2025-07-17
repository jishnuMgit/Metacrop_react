import { ApexChart } from "@/data/PieChart";

const ShowAttendancePie = () => {
  const dummyData = [
    { label: "Present", value: 50 },
    { label: "Absent", value: 20 },
    { label: "Leave", value: 10 },
    { label: "Half day", value: 20 },
  ];

  const total = dummyData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md dark:bg-dark-primary-bg">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Team Attendance Overview
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Summary of attendance for this week. Total entries: <strong>{total}</strong>
        </p>
      </div>

      {/* Chart */}
<div className="">
    <div>
          <ApexChart data={dummyData} description="Attendance Distribution" />

</div>
      {/* Breakdown */}
      <div className="mt-6 text-sm  text-green-600 font-bold dark:text-gray-300">
        {dummyData.map((item) => (
          <div key={item.label} className="flex gap-5">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
</div>
    </div>
  );
};

export default ShowAttendancePie;

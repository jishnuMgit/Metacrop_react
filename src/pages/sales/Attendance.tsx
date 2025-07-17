import EnterAttendance from "@/components/Attendance/EnterAttendance";
import ShowAttendance from "@/components/Attendance/ShowAttendance";
import { useState } from "react";
import Employee from "../EmpCust/Employee";

const Attendance = () => {
  const [activeTab, setActiveTab] = useState("show");

  return (
    <div className="p-4">
      {/* Nav Tabs */}
      <div className="flex gap-6 mb-4">
        <button
          onClick={() => setActiveTab("show")}
          className={`relative pb-2 font-medium text-sm transition-all ${
            activeTab === "show" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <span className="inline-block relative">
            View Records
            {activeTab === "show" && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600"></span>
            )}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("enter")}
          className={`relative pb-2 font-medium text-sm transition-all ${
            activeTab === "enter" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <span className="inline-block relative">
            Mark Attendance
            {activeTab === "enter" && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600"></span>
            )}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("AddEmp")}
          className={`relative pb-2 font-medium text-sm transition-all ${
            activeTab === "AddEmp" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <span className="inline-block relative">
            Add Employee
            {activeTab === "AddEmp" && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600"></span>
            )}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "show" && <ShowAttendance />}
      {activeTab === "enter" && <EnterAttendance />}
      {activeTab === "AddEmp" && <Employee />}
    </div>
  );
};

export default Attendance;

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Typography,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import { CreateAxiosDefaults } from "useipa";
import Env from "@/config/env";

interface AttendanceEntry {
  staffId: number;
  employee: string;
  position: string;
  date1: Date;
  morning1: boolean;
  afternoon1: boolean;
  isLeave: boolean;
}

const client: CreateAxiosDefaults = {
    baseURL: Env.VITE_BASE_URL,
    withCredentials: true,
  }
const EnterAttendancePage: React.FC = () => {
  // const today = new Date();
  const [attendanceData, setAttendanceData] = useState<AttendanceEntry[]>([]);

  // ✅ Load attendance from backend
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(`${client?.baseURL}/staff/GetAllStaffAttendance`, {
          method: "GET",
          credentials: "include", // for cookie/session
        });

        const data = await res.json();

        const formatted: AttendanceEntry[] = data.map((att: any) => ({
          staffId: att.staffId,
          employee: `${att.staff.FirstName} ${att.staff.LastName}`,
          position: att.staff.job,
          date1: new Date(att.date),
          morning1: att.morning,
          afternoon1: att.afternoon,
          isLeave: att.leave,
        }));

        setAttendanceData(formatted);
      } catch (err) {
        console.error("Fetch attendance error", err);
      }
    };

    fetchAttendance();
  }, []);

  // ✅ Toggle checkbox logic
  const handleCheckboxChange = (index: number, field: keyof AttendanceEntry) => {
    const updated = [...attendanceData];

    if (field === "isLeave") {
      updated[index].isLeave = !updated[index].isLeave;
      if (updated[index].isLeave) {
        updated[index].morning1 = false;
        updated[index].afternoon1 = false;
      }
    } else if (field === "morning1" || field === "afternoon1") {
      updated[index][field] = !updated[index][field];
      if (updated[index].morning1 || updated[index].afternoon1) {
        updated[index].isLeave = false;
      }
    }

    setAttendanceData(updated);
  };

  // ✅ Submit to backend
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${client?.baseURL}/staff/UpdateOrCreate`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceData),
      });

      if (!res.ok) throw new Error("Failed to save attendance");

      alert("Attendance submitted successfully!");
    } catch (err) {
      console.error("Submit error", err);
      alert("Something went wrong while submitting.");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-dark-primary-bg rounded-xl shadow-md max-w-full overflow-x-auto">
      <Typography variant="h4" className="mb-6 text-center">
        Enter Attendance
      </Typography>

      <table className="min-w-[900px] w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Employee</th>
            <th className="border p-2">Position</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Morning</th>
            <th className="border p-2">Afternoon</th>
            <th className="border p-2">Leave</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{entry.employee}</td>
              <td className="border p-2">{entry.position}</td>
              <td className="border p-2">
                <DatePicker
                  selected={entry.date1}
                  onChange={() => {}}
                  className="border rounded px-2 py-1 w-32 bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </td>
              <td className="border p-2">
                <Checkbox
                  checked={entry.morning1}
                  onChange={() => handleCheckboxChange(index, "morning1")}
                  crossOrigin={undefined}
                />
              </td>
              <td className="border p-2">
                <Checkbox
                  checked={entry.afternoon1}
                  onChange={() => handleCheckboxChange(index, "afternoon1")}
                  crossOrigin={undefined}
                />
              </td>
              <td className="border p-2">
                <Checkbox
                  checked={entry.isLeave}
                  onChange={() => handleCheckboxChange(index, "isLeave")}
                  crossOrigin={undefined}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center">
        <Button color="green" onClick={handleSubmit}>
          Submit All Attendance
        </Button>
      </div>
    </div>
  );
};

export default EnterAttendancePage;

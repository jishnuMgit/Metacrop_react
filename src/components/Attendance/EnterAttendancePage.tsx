import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Typography,
  Button,
  Checkbox,
} from "@material-tailwind/react";

const employees = [
  { name: "Employee 1", position: "Manager" },
  { name: "Employee 2", position: "Sales" },
  { name: "Employee 3", position: "Support" },
  { name: "Employee 4", position: "Sales" },
  { name: "Employee 5", position: "Support" },
];

const EnterAttendancePage = () => {
  const today = new Date();

  const [attendanceData, setAttendanceData] = useState(
    employees.map((emp) => ({
      employee: emp.name,
      position: emp.position,
      date1: today,
      morning1: false,
      afternoon1: false,
      
      Leave: false,
    }))
  );

  const handleCheckboxChange = (index: number, field: string) => {
    const updated = [...attendanceData];
    updated[index][field] = !updated[index][field];
    setAttendanceData(updated);
  };

  const handleDateChange = (index: number, field: string, date: Date) => {
    const updated = [...attendanceData];
    updated[index][field] = date;
    setAttendanceData(updated);
  };

  const handleSubmit = () => {
    console.log("Submitted Attendance:", attendanceData);
    // You can send this to backend via fetch/axios
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
            <th className="border p-2">Date 1</th>
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
                  onChange={(date) => handleDateChange(index, "date1", date!)}
                  className="border rounded px-2 py-1 w-32"
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
                  checked={entry.Leave}
                  onChange={() => handleCheckboxChange(index, "Leave")}
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

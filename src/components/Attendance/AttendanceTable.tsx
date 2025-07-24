import { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AttendanceTable = () => {
  const today = new Date();
  const defaultStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const defaultEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [rawData, setRawData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState(today);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  const rowsPerPage = 10;

  // ✅ Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/v1/staff/GetAllAttendanceRecords", {
          credentials: "include",
        });
        const data = await res.json();
        setRawData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching attendance records", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Apply filters
  useEffect(() => {
    const filtered = rawData.filter((item) => {
      const itemDate = new Date(item.date);
      const matchDate = itemDate >= startDate && itemDate <= endDate;
      const matchEmployee = selectedEmployee
        ? item.employee === selectedEmployee.value
        : true;
      const matchPosition = selectedPosition
        ? item.position === selectedPosition.value
        : true;
      return matchDate && matchEmployee && matchPosition;
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [startDate, endDate, selectedEmployee, selectedPosition, rawData]);

  const employeeOptions = [...new Set(rawData.map((d) => d.employee))].map((emp) => ({
    value: emp,
    label: emp,
  }));

  const positionOptions = [...new Set(rawData.map((d) => d.position))].map((pos) => ({
    value: pos,
    label: pos,
  }));

  const currentPageData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md dark:bg-dark-primary-bg">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Detailed Attendance Records
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click filter to view specific attendance records.
          </p>
        </div>
        <Button
          onClick={() => setOpenFilter(true)}
          className="bg-blue-600 text-white px-4 py-2 text-sm"
        >
          Open Filters
        </Button>
      </div>

      {/* Filter Modal */}
      <Dialog open={openFilter} handler={() => setOpenFilter(false)} size="md">
        <DialogHeader className="flex justify-between items-center">
          <Typography variant="h5">Filter Attendance</Typography>
          <IconButton variant="text" onClick={() => setOpenFilter(false)}>
            <XMarkIcon className="w-5 h-5" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm">Employee</label>
            <Select
              options={employeeOptions}
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              isClearable
              placeholder="Select Employee"
              className="min-w-[180px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Job Position</label>
            <Select
              options={positionOptions}
              value={selectedPosition}
              onChange={setSelectedPosition}
              isClearable
              placeholder="Select Position"
              className="min-w-[180px]"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date!)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="border px-2 py-1 rounded"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-sm">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date!)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                className="border px-2 py-1 rounded"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Select Month</label>
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => {
                const start = new Date(date!.getFullYear(), date!.getMonth(), 1);
                const end = new Date(date!.getFullYear(), date!.getMonth() + 1, 0);
                setSelectedMonth(date!);
                setStartDate(start);
                setEndDate(end);
              }}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="border px-2 py-1 rounded"
            />
          </div>
        </DialogBody>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outlined"
            color="red"
            onClick={() => {
              setSelectedEmployee(null);
              setSelectedPosition(null);
              setStartDate(defaultStart);
              setEndDate(defaultEnd);
              setSelectedMonth(today);
              setFilteredData(rawData);
              setOpenFilter(false);
            }}
          >
            Reset
          </Button>
          <Button color="green" onClick={() => setOpenFilter(false)}>
            Apply Filter
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Table */}
      <div className="overflow-auto mt-6">
        <table className="w-full border text-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Employee</th>
              <th className="border p-2">Position</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, i) => (
              <tr key={item.id} className="text-gray-800 dark:text-gray-100">
                <td className="border p-2">{i + 1 + (currentPage - 1) * rowsPerPage}</td>
                <td className="border p-2">{item.employee}</td>
                <td className="border p-2">{item.position}</td>
                <td className="border p-2">{new Date(item.date).toDateString()}</td>
                <td className="border p-2">{item.status}</td>
              </tr>
            ))}
            {currentPageData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;


import AttendanceTable from "./AttendanceTable"
import ShowAttendancePie from "./ShowAttendancePie"

const ShowAttendance = () => {
  return (
    <div className="flex flex-col gap-10">

        <div>
            <ShowAttendancePie/>
        </div>
        <div>
            <AttendanceTable/>
        </div>
    </div>
  )
}

export default ShowAttendance
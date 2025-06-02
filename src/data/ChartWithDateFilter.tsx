import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ApexCharts from 'react-apexcharts'

type ChartProps=any

interface ChartWithDateFilterProps {
  chartData: ChartProps// your chart prop type
}

const ChartWithDateFilter: React.FC<ChartWithDateFilterProps> = ({ chartData }) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  // Example: Filter logic here based on startDate, endDate and chartData
  // You may need to implement filtering of series data and xaxis.categories here

  // For now, just display the original chart:
  return (
    <div className="mt-6">
      <div className="flex gap-4 mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="border p-2 rounded"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="border p-2 rounded"
        />
      </div>

      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type={chartData.type}
        height={chartData.height}
      />
    </div>
  )
}

export default ChartWithDateFilter

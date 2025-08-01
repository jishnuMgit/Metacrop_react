import { Props } from 'react-apexcharts'

type ChartConfig = NonNullable<Props['options']>
export const chartsConfig: ChartConfig = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  title: {
    // show: '',
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: '#37474f',
        fontSize: '13px',
        fontFamily: 'inherit',
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#37474f',
        fontSize: '13px',
        fontFamily: 'inherit',
        fontWeight: 300,
      },
    },
  },
  grid: {
    show: true,
    borderColor: '#dddddd',
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: 'dark',
  },
}

export default chartsConfig

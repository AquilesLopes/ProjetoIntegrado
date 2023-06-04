import { Chart } from "react-google-charts";
import { infoDataBase } from "../../mock/info_data_base_mock";
 
export const data = [
  ["", "Válidos", "Vencidos", "Cancelados", "Suspensos"],
  [" ", 
    infoDataBase.mapStatus.VALID, 
    infoDataBase.mapStatus.EXPIRED, 
    infoDataBase.mapStatus.CANCELLED,
    infoDataBase.mapStatus.SUSPENDED
  ],
];

export const options = {
  chart: {
    title: "",
    subtitle: "",
  },
  colors: ['#188268', '#DB4437', '#EDBB49', '#1e120a'],
  height: 133,
  bar: {
    minSize: 50,
    maxSize: 100,
    groupWidth: '50%'
  },
  legend: { position: "top" },
  hAxis: {
    title: "",
    minValue: 0,
  },
  vAxis: {
    title: "",
    gridlines: {
      count: 0
    },
    viewWindow: {
      min: 0
    }
  },
  bars:  "horizontal",
  animation:{
    duration: 1000,
    easing: 'out',
  },
  annotations: {
    textStyle: {
      fontSize: 12,
      color: 'black'
    },
    alwaysOutside: true,
  }
};

const ChartInfoDataBase: React.FC = () => {
  return (
    <Chart 
      chartType="Bar"
      width="100%"
      height="133px"
      data={data}
      options={options}
    />
  );
};

export default ChartInfoDataBase;

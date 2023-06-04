import { Chart } from "react-google-charts";

export const data = [
  ["", "Limite", "Realizadas", "Disponíveis"],
  [" ", 500, 278, 222],
];

export const options = {
  chart: {
    title: "",
    subtitle: "",
  },
  colors: ['#188268', '#DB4437', '#4441c8'],  
  height: 100,
  legend: { position: "top" },
  hAxis: {
    title: "",
    minValue: 0,
  },
  vAxis: {
    title: "",
  },
  bars:  "horizontal",
  animation:{
    duration: 1000,
    easing: 'out',
  },
};

const ChartBarUser: React.FC = () => {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="100px"
      data={data}
      options={options}
    />
  );
};

export default ChartBarUser;

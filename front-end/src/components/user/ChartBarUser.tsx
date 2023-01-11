import { Chart } from "react-google-charts";
import { isMobile } from "../../util/util";

export const data = [
  ["", "Limite", "Realizadas"],
  ["Hoje", 500, 278],
];

export const options = {
  chart: {
    title: "",
    subtitle: "",
  },
  height: 150,
  legend: { position: "top" },
  hAxis: {
    title: "",
    minValue: 0,
  },
  vAxis: {
    title: "",
  },
  bars:  "vertical",
  animation:{
    duration: 1000,
    easing: 'out',
  },
};

const ChartBarUser: React.FC = () => {
  return (
    <Chart 
      chartType="Bar"
      width={isMobile ? "100%" : "80%"}
      height="200px"
      data={data}
      options={options}
    />
  );
};

export default ChartBarUser;

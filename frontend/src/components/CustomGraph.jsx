import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomGraph = (props) => {
  //   console.log("props", props);

  const { options } = props;
  //   console.log("options", options);
  const labels = props?.data?.labels;
  const datasets = props?.data?.datasets;
  //   console.log("datasets", datasets);
  const dataNew = {
    labels,
    datasets,
  };
  return (
    <div>
      <Bar options={options} data={dataNew} className="mb-4" />{" "}
    </div>
  );
};

export default CustomGraph;

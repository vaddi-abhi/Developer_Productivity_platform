import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function HistoryChart({ data }) {

  const chartData =
    data.map((item, index) => ({
      snapshot: index + 1,
      score: item.score
    }));

  return (
    <LineChart
      width={700}
      height={300}
      data={chartData}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="snapshot" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="score"
      />
    </LineChart>
  );
}

export default HistoryChart;
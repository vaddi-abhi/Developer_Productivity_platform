import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

function ScoreBreakdownChart({ data }) {

  const chartData = [
    {
      name: "Repository",
      value: data.repository_score
    },
    {
      name: "Stars",
      value: data.star_score
    },
    {
      name: "Followers",
      value: data.follower_score
    },
    {
      name: "Diversity",
      value: data.diversity_score
    }
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042"
  ];

  return (
    <PieChart
      width={500}
      height={350}
    >
      <Pie
        data={chartData}
        dataKey="value"
        outerRadius={120}
        label
      >
        {chartData.map(
          (entry, index) => (
            <Cell
              key={index}
              fill={
                COLORS[
                  index %
                  COLORS.length
                ]
              }
            />
          )
        )}
      </Pie>

      <Tooltip />

      <Legend />
    </PieChart>
  );
}

export default ScoreBreakdownChart;
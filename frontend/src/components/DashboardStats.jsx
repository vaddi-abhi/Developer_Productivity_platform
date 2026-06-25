import StatCard from "./StatCard";

function DashboardStats({ data, growth }) {

  if (!data) return null;

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        lg:grid-cols-6
        gap-4
        mb-10
      "
    >
      <StatCard
        title="Developer Score"
        value={data.developer_score}
      />

      <StatCard
        title="Repositories"
        value={data.repositories}
      />

      <StatCard
        title="Followers"
        value={data.followers}
      />

      <StatCard
        title="Stars"
        value={data.stars}
      />

      <StatCard
        title="Growth %"
        value={
          growth
            ? growth.growth_percent
            : 0
        }
      />

      <StatCard
        title="Snapshots"
        value={
          growth
            ? growth.snapshots
            : 0
        }
      />

    </div>
  );
}

export default DashboardStats;
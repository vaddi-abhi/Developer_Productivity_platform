import { useState } from "react";
import api from "./services/api";
import StatCard from "./components/StatCard";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
const [growth, setGrowth] = useState(null);

  const fetchSummary = async () => {
  try {

    const summaryResponse =
      await api.get(
        `/summary/${username}`
      );

    setData(
      summaryResponse.data
    );

    const growthResponse =
      await api.get(
        `/growth/${username}`
      );

    setGrowth(
      growthResponse.data
    );

  } catch (error) {
    console.error(error);
    alert("User not found");
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>DevInsight Dashboard</h1>

      <input
        type="text"
        placeholder="GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={fetchSummary}>
        Analyze
      </button>

      {data && (
  <>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "20px"
      }}
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
      {growth && (
  <>
    <StatCard
      title="Growth %"
      value={growth.growth_percent}
    />

    <StatCard
      title="Snapshots"
      value={growth.snapshots}
    />
  </>
)}
    </div>

    <div style={{ marginTop: "20px" }}>
      <h3>Top Language</h3>
      <p>{data.top_language}</p>

      <h3>Most Starred Repo</h3>
      <p>{data.most_starred_repo}</p>

      <h3>Snapshots Stored</h3>
      <p>{data.snapshots_stored}</p>
    </div>
  </>
)}
    </div>
  );
}

export default App;
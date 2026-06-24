import { useState } from "react";
import api from "./services/api";
import StatCard from "./components/StatCard";
import HistoryChart from "./components/HistoryChart";
import ScoreBreakdownChart
from "./components/ScoreBreakdownChart";

function App() {
  const [codeforces, setCodeforces] =useState(null);
const [githubUsername, setGithubUsername] = useState("");
const [cfHandle, setCfHandle] = useState("");
  const [data, setData] = useState(null);
const [growth, setGrowth] = useState(null);
const [history, setHistory] = useState([]);
const [breakdown, setBreakdown] = useState(null);
const [loading, setLoading] = useState(false);

const fetchSummary = async () => {

  try {

    setLoading(true);

    const response = await api.get(
  `/analytics?github=${githubUsername}&cf=${cfHandle}`
);

const analytics =
  response.data;

    setData(
      analytics.summary
    );

    setGrowth(
      analytics.growth
    );

    setHistory(
      analytics.history
    );

    setBreakdown(
      analytics.breakdown
    );

    setCodeforces(
      analytics.codeforces
    );

  } catch (error) {

    console.error(error);

    alert("User not found");

  } finally {

    setLoading(false);

  }
};

 /* return (
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
      {loading && (
  <h3>Loading analytics...</h3>
)}

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
  {history.length > 0 && (
  <div style={{ marginTop: "40px" }}>
    <h2>Developer Score Trend</h2>

    <HistoryChart
      data={history}
    />
    {breakdown && (
  <div
    style={{
      marginTop: "50px"
    }}
  >
    <h2>
      Developer Score Breakdown
    </h2>

    <ScoreBreakdownChart
      data={breakdown}
    />
  </div>
)}
  </div>
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
  );*/
  return (
  <div className="min-h-screen bg-slate-900 text-white">

    <div className="max-w-7xl mx-auto px-8 py-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          DevInsight
        </h1>

        <p className="text-slate-400 mt-2">
          Analyze Your Developer Journey
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-10">

        <div className="flex flex-col gap-4 mb-10">

  <input
    type="text"
    placeholder="GitHub Username"
    value={githubUsername}
    onChange={(e) =>
      setGithubUsername(e.target.value)
    }
    className="
      px-4 py-3
      rounded-xl
      bg-slate-800
      border border-slate-700
      w-96
    "
  />

  <input
    type="text"
    placeholder="Codeforces Handle"
    value={cfHandle}
    onChange={(e) =>
      setCfHandle(e.target.value)
    }
    className="
      px-4 py-3
      rounded-xl
      bg-slate-800
      border border-slate-700
      w-96
    "
  />

  <button
    onClick={fetchSummary}
    className="
      px-6 py-3
      rounded-xl
      bg-blue-600
      hover:bg-blue-700
      w-40
    "
  >
    Analyze
  </button>

</div>

       

      </div>

      {/* Loading */}
      {loading && (
        <h2 className="text-xl mb-8">
          Loading Analytics...
        </h2>
      )}

      {data && (
  <div
    className="
      bg-slate-800
      border border-slate-700
      rounded-2xl
      p-6
      mb-8
      flex
      items-center
      gap-6
    "
  >
    <img
      src={data.avatar}
      alt="GitHub Avatar"
      className="w-24 h-24 rounded-full"
    />

    <div>
      <h2 className="text-3xl font-bold">
        {githubUsername}
      </h2>

      <a
        href={data.github_url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400"
      >
        View GitHub Profile
      </a>
    </div>
  </div>
)}

      


      {/* Cards */}
      {data && (
        <>
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

          {codeforces && (
  <>
    <h2 className="text-2xl font-bold mb-4">
      Codeforces Analytics
    </h2>

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-4
        mb-8
      "
    >
      <StatCard
        title="CF Rating"
        value={codeforces.rating}
      />

      <StatCard
        title="Max Rating"
        value={codeforces.max_rating}
      />

      <StatCard
        title="Contribution"
        value={codeforces.contribution}
      />

      <StatCard
        title="Friends"
        value={codeforces.friend_of_count}
      />
    </div>

    <div
      className="
        bg-slate-800
        border border-slate-700
        rounded-2xl
        p-6
        mb-8
      "
    >
      <p>
        <strong>Handle:</strong>{" "}
        {codeforces.handle}
      </p>

      <p>
        <strong>Rank:</strong>{" "}
        {codeforces.rank}
      </p>

      <p>
        <strong>Max Rank:</strong>{" "}
        {codeforces.max_rank}
      </p>
    </div>
  </>
)}

          {/* Developer Info */}
          <div
            className="
              bg-slate-800
              border border-slate-700
              rounded-2xl
              p-6
              mb-10
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              Developer Summary
            </h2>

            <p>
              <strong>Top Language:</strong>{" "}
              {data.top_language}
            </p>

            <p>
              <strong>Most Starred Repo:</strong>{" "}
              {data.most_starred_repo}
            </p>

            <p>
              <strong>Snapshots Stored:</strong>{" "}
              {data.snapshots_stored}
            </p>
          </div>

          {/* Charts */}
          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-8
            "
          >

            {history.length > 0 && (
              <div
                className="
                  bg-slate-800
                  border border-slate-700
                  rounded-2xl
                  p-6
                "
              >
                <h2 className="text-2xl font-bold mb-6">
                  Developer Score Trend
                </h2>

                <HistoryChart
                  data={history}
                />
              </div>
            )}

            {breakdown && (
              <div
                className="
                  bg-slate-800
                  border border-slate-700
                  rounded-2xl
                  p-6
                "
              >
                <h2 className="text-2xl font-bold mb-6">
                  Score Breakdown
                </h2>

                <ScoreBreakdownChart
                  data={breakdown}
                />
              </div>
            )}

          </div>
        </>
      )}

    </div>

  </div>
);
}

export default App;
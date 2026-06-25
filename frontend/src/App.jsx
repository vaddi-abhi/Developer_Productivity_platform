import { useState } from "react";
import api from "./services/api";

import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import DashboardStats from "./components/DashboardStats";
import CodeforcesCard from "./components/CodeforcesCard";
import LeetCodeCard from "./components/LeetCodeCard";
import RepositoryTable from "./components/RepositoryTable";
import HistoryChart from "./components/HistoryChart";
import ScoreBreakdownChart from "./components/ScoreBreakdownChart";

function App() {
  const [githubUsername, setGithubUsername] = useState("");
  const [cfHandle, setCfHandle] = useState("");
  const [leetcodeHandle, setLeetcodeHandle] = useState("");

  const [leetcode, setLeetcode] = useState(null);

  const [data, setData] = useState(null);
  const [growth, setGrowth] = useState(null);
  const [history, setHistory] = useState([]);
  const [breakdown, setBreakdown] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [codeforces, setCodeforces] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {

    if (!githubUsername.trim()) {
      alert("Please enter a GitHub username.");
      return;
    }

    try {

      setLoading(true);

      const { data: analytics } = await api.get(
        `/analytics?github=${githubUsername}&cf=${cfHandle}&leetcode=${leetcodeHandle}`
      );

      setData(analytics.summary);
      setGrowth(analytics.growth);
      setHistory(analytics.history);
      setBreakdown(analytics.breakdown);
      setCodeforces(analytics.codeforces);
      setLeetcode(
        analytics.leetcode
      );

      const { data: repos } = await api.get(
        `/repositories/${githubUsername}`
      );

      setRepositories(repos);

    } catch (error) {

      console.error(error);

      setData(null);
      setGrowth(null);
      setHistory([]);
      setBreakdown(null);
      setRepositories([]);
      setCodeforces(null);

      alert("User not found");

    } finally {

      setLoading(false);

    }

  };

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

        <SearchBar
          githubUsername={githubUsername}
          setGithubUsername={setGithubUsername}
          cfHandle={cfHandle}
          setCfHandle={setCfHandle}
          leetcodeHandle={leetcodeHandle}
          setLeetcodeHandle={setLeetcodeHandle}
          fetchSummary={fetchSummary}
          loading={loading}
        />

        {/* Loading */}

        {loading && (
          <h2 className="text-xl mb-8">
            Loading Analytics...
          </h2>
        )}

        {/* Profile */}

        <ProfileCard
          data={data}
          githubUsername={githubUsername}
        />

        {/* Dashboard Stats */}

        {data && (
          <DashboardStats
            data={data}
            growth={growth}
          />
        )}

        {/* Codeforces */}

        <CodeforcesCard
          codeforces={codeforces}
        />

        {/* LeetCode */}

        <LeetCodeCard
          leetcode={leetcode}
        />

        {/* Developer Summary */}

        {data && (

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

        )}

        {/* Charts */}

        {data && (

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-8
              mb-10
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

        )}

        {/* Repository Table */}

        {repositories.length > 0 && (

          <RepositoryTable
            repositories={repositories}
          />

        )}

      </div>

    </div>
  );
}

export default App;
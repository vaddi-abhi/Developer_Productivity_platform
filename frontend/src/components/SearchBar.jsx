
function SearchBar({

  githubUsername,
  setGithubUsername,

  cfHandle,
  setCfHandle,

  leetcodeHandle,
  setLeetcodeHandle,

  fetchSummary,
  loading

}) {

  return (

    <div className="mb-10">

      <div className="flex flex-col gap-4 max-w-md">

        <input
          type="text"
          placeholder="GitHub Username"
          value={githubUsername}
          onChange={(e) =>
            setGithubUsername(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchSummary();
            }
          }}
          className="
    px-4
    py-3
    rounded-xl
    bg-slate-800
    border
    border-slate-700
    outline-none
    focus:border-blue-500
  "
        />

        <input
          type="text"
          placeholder="Codeforces Handle (Optional)"
          value={cfHandle}
          onChange={(e) =>
            setCfHandle(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchSummary();
            }
          }}
          className="
    px-4
    py-3
    rounded-xl
    bg-slate-800
    border
    border-slate-700
    outline-none
    focus:border-blue-500
  "
        />

        <input
          type="text"
          placeholder="LeetCode Username (Optional)"
          value={leetcodeHandle}
          onChange={(e) =>
            setLeetcodeHandle(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchSummary();
            }
          }}
          className="
    px-4
    py-3
    rounded-xl
    bg-slate-800
    border
    border-slate-700
    outline-none
    focus:border-blue-500
  "
        />

        <button
          onClick={fetchSummary}
          disabled={loading}
          className="
            bg-blue-600
            hover:bg-blue-700
            rounded-xl
            py-3
            font-semibold
            disabled:opacity-50
          "
        >
          {loading
            ? "Analyzing..."
            : "Analyze"}
        </button>

      </div>

    </div>

  );
}

export default SearchBar;
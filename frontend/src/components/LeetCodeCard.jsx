function LeetCodeCard({ leetcode }) {

  if (!leetcode) return null;

  return (
    <div
      className="
        bg-slate-800
        border border-slate-700
        rounded-2xl
        p-6
        mb-8
      "
    >
      <div className="flex items-center gap-4 mb-6">

        <img
          src={leetcode.avatar}
          alt="LeetCode Avatar"
          className="w-16 h-16 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-bold">
            LeetCode Profile
          </h2>

          <p className="text-slate-400">
            {leetcode.username}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div>
          <p className="text-slate-400">Solved</p>
          <p className="text-xl font-semibold">
            {leetcode.total_solved}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Easy</p>
          <p className="text-xl font-semibold">
            {leetcode.easy}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Medium</p>
          <p className="text-xl font-semibold">
            {leetcode.medium}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Hard</p>
          <p className="text-xl font-semibold">
            {leetcode.hard}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Contest Rating</p>
          <p className="text-xl font-semibold">
            {leetcode.contest_rating ?? "N/A"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Global Rank</p>
          <p className="text-xl font-semibold">
            {leetcode.contest_rank ?? "N/A"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Contests</p>
          <p className="text-xl font-semibold">
            {leetcode.contests}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Reputation</p>
          <p className="text-xl font-semibold">
            {leetcode.reputation}
          </p>
        </div>

      </div>

    </div>
  );
}

export default LeetCodeCard;
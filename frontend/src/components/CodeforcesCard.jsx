function CodeforcesCard({ codeforces }) {

  if (!codeforces) return null;

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
      <h2 className="text-2xl font-bold mb-4">
        Codeforces Profile
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <p className="text-slate-400">Handle</p>
          <p className="font-semibold">
            {codeforces.handle}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Rank</p>
          <p className="font-semibold">
            {codeforces.rank}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Rating</p>
          <p className="font-semibold">
            {codeforces.rating}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Max Rating</p>
          <p className="font-semibold">
            {codeforces.max_rating}
          </p>
        </div>

      </div>

    </div>
  );
}

export default CodeforcesCard;
function RepositoryTable({ repositories }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Repositories
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left p-3">Repository</th>

              <th className="text-left p-3">Language</th>

              <th className="text-center p-3">⭐ Stars</th>

              <th className="text-center p-3">🍴 Forks</th>

              <th className="text-center p-3">Last Updated</th>

              <th className="text-center p-3">Open</th>

            </tr>

          </thead>

          <tbody>

            {repositories.map((repo, index) => (

              <tr
                key={index}
                className="border-b border-slate-700 hover:bg-slate-700 transition"
              >

                <td className="p-3">

                  <div className="font-semibold">
                    {repo.name}
                  </div>

                  <div className="text-sm text-slate-400">
                    {repo.description || "No description"}
                  </div>

                </td>

                <td className="p-3">
                  {repo.language || "-"}
                </td>

                <td className="text-center p-3">
                  {repo.stars}
                </td>

                <td className="text-center p-3">
                  {repo.forks}
                </td>

                <td className="text-center p-3">
                  {new Date(repo.updated_at).toLocaleDateString()}
                </td>

                <td className="text-center p-3">

                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    View
                  </a>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RepositoryTable;
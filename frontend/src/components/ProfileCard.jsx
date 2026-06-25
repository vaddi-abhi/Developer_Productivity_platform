function ProfileCard({ data, githubUsername }) {

  if (!data) return null;

  return (

    <div
      className="
        bg-slate-800
        border
        border-slate-700
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
        alt="avatar"
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
          className="text-blue-400 hover:underline"
        >
          View GitHub Profile
        </a>

      </div>

    </div>

  );

}

export default ProfileCard;
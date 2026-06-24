function StatCard({
  title,
  value
}) {
  return (

    <div
      className="
        bg-slate-800
        border border-slate-700
        rounded-2xl
        p-6
        shadow-lg
        hover:scale-105
        transition
      "
    >

      <h3
        className="
          text-slate-400
          text-sm
        "
      >
        {title}
      </h3>

      <h1
        className="
          text-3xl
          font-bold
          mt-2
        "
      >
        {value}
      </h1>

    </div>

  );
}

export default StatCard;
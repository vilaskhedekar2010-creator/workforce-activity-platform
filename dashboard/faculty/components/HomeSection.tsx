type HomeSectionProps = {
  stats: {
    classes: any[];
    sentMessages: any[];
  };
};

export default function HomeSection({
  stats,
}: HomeSectionProps) {
  return (
    <div
      className="flex min-h-[75vh] items-end justify-center rounded-2xl bg-cover bg-center pb-12 shadow-lg"
      style={{
        backgroundImage: "url('/campus.jpeg')",
      }}
    >
      <div className="w-full max-w-5xl rounded-2xl bg-white/10 px-10 py-8 text-center text-black shadow-md">
        <h1 className="text-6xl font-bold">
          Welcome
        </h1>

        <p className="mt-4 text-2xl">
          Faculty Communication & Collaboration Platform
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="text-5xl font-bold text-blue-700">
              {stats.classes.length}
            </h2>

            <p className="mt-3 text-xl">
              Assigned Classes
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="text-5xl font-bold text-green-700">
              {stats.sentMessages.length}
            </h2>

            <p className="mt-3 text-xl">
              Messages Sent
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="text-5xl font-bold text-yellow-600">
              Coming Soon
            </h2>

            <p className="mt-3 text-xl">
              Tasks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
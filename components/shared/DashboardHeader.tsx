type DashboardHeaderProps = {
  title: string;
  subtitle: string;
  fullName: string;
  email: string;
  onLogout: () => void;
};

export default function DashboardHeader({
  title,
  subtitle,
  fullName,
  email,
  onLogout,
}: DashboardHeaderProps) {

  return (

    <div className="mb-8 flex flex-col gap-4 rounded border bg-white p-5 shadow md:flex-row md:items-center md:justify-between">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <img
          src="/logo.png"
          alt="University Logo"
          className="h-16 w-16 object-contain"
        />

        <div>

          <h1 className="text-3xl font-bold text-gray-800">

            {title}

          </h1>

          <p className="text-sm text-gray-500">

            {subtitle}

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">

        <div className="text-right">

          <p className="font-semibold text-gray-800">

            {fullName}

          </p>

          <p className="text-sm text-gray-500">

            {email}

          </p>

        </div>

        <button
          onClick={onLogout}
          className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
        >

          Logout

        </button>

      </div>

    </div>
  );
}
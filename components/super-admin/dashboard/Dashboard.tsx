import StatCard from "@/components/shared/StatCard";

type DashboardProps = {
  totalInstitutes: number;
  totalDepartments: number;
  totalUsers: number;
};

export default function Dashboard({
  totalInstitutes,
  totalDepartments,
  totalUsers,
}: DashboardProps) {

  return (

    <div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        <StatCard
          title="Institutes"
          value={totalInstitutes}
          color="text-blue-700"
        />

        <StatCard
          title="Departments"
          value={totalDepartments}
          color="text-green-700"
        />

        <StatCard
          title="Users"
          value={totalUsers}
          color="text-purple-700"
        />

      </div>

      <div className="rounded-2xl bg-white p-8 shadow-lg">

        <h2 className="text-3xl font-bold">

          Welcome

        </h2>

        <p className="mt-3 text-gray-600">

          Super Admin Management &
          Communication Platform

        </p>

      </div>

    </div>

  );

}
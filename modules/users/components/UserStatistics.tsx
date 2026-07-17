type UserStatisticsProps = {
  totalUsers: number;
  totalFaculty: number;
  totalStudents: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
};

const statistics = [
  {
    title: "Total Users",
    key: "totalUsers",
    color: "text-blue-700",
    background: "bg-blue-50",
  },
  {
    title: "Coordinators",
    key: "totalFaculty",
    color: "text-green-700",
    background: "bg-green-50",
  },
  {
    title: "Members",
    key: "totalStudents",
    color: "text-purple-700",
    background: "bg-purple-50",
  },
  {
    title: "Active",
    key: "activeUsers",
    color: "text-emerald-700",
    background: "bg-emerald-50",
  },
  {
    title: "Inactive",
    key: "inactiveUsers",
    color: "text-yellow-700",
    background: "bg-yellow-50",
  },
  {
    title: "Suspended",
    key: "suspendedUsers",
    color: "text-red-700",
    background: "bg-red-50",
  },
];

export default function UserStatistics({
  totalUsers,
  totalFaculty,
  totalStudents,
  activeUsers,
  inactiveUsers,
  suspendedUsers,
}: UserStatisticsProps) {
  const values = {
    totalUsers,
    totalFaculty,
    totalStudents,
    activeUsers,
    inactiveUsers,
    suspendedUsers,
  };

  return (
    <div className="mb-8 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {statistics.map((item) => (
        <div
          key={item.key}
          className={`rounded border p-4 ${item.background}`}
        >
          <h3 className="text-sm font-semibold text-gray-600">
            {item.title}
          </h3>

          <p className={`text-3xl font-bold ${item.color}`}>
            {values[item.key as keyof typeof values]}
          </p>
        </div>
      ))}
    </div>
  );
}
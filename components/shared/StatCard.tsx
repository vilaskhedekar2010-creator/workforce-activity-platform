type StatCardProps = {
  title: string;
  value: string | number;
  color: string;
};

export default function StatCard({
  title,
  value,
  color,
}: StatCardProps) {

  return (

    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h2
        className={`text-5xl font-bold ${color}`}
      >

        {value}

      </h2>

      <p className="mt-3 text-xl text-gray-700">

        {title}

      </p>

    </div>
  );
}
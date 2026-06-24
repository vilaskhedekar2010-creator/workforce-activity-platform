type SidebarItem = {
  id: string;
  label: string;
};

type DashboardSidebarProps = {
  title: string;
  activeModule: string;
  setActiveModule: (
    module: string
  ) => void;
  menuItems: SidebarItem[];
};

export default function DashboardSidebar({
  title,
  activeModule,
  setActiveModule,
  menuItems,
}: DashboardSidebarProps) {

  return (

    <div className="w-72 bg-gray-900 text-white shadow-lg">

      {/* LOGO */}

      <div className="border-b border-gray-700 p-6 text-center">

        <img
          src="/logo.png"
          alt="Logo"
          className="mx-auto mb-3 h-20 w-20 object-contain"
        />

        <h2 className="text-xl font-bold">

          {title}

        </h2>

      </div>

      {/* MENU */}

      <div className="mt-5 flex flex-col gap-2 px-4">

        {
          menuItems.map((item) => (

            <button
              key={item.id}

              onClick={() =>
                setActiveModule(
                  item.id
                )
              }

              className={`rounded px-4 py-3 text-left transition ${
                activeModule ===
                item.id

                  ? "bg-blue-600"

                  : "hover:bg-gray-800"
              }`}
            >

              {item.label}

            </button>
          ))
        }

      </div>

    </div>
  );
}
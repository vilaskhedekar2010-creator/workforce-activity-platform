type CategorySectionProps = {
  groups: any[];

  selectedGroup: string;
  onGroupChange: (groupId: string) => void;

  categoryName: string;
  setCategoryName: (value: string) => void;

  messageCategories: any[];

  handleCreateCategory: () => void;
};

export default function CategorySection({
  groups,
  selectedGroup,
  onGroupChange,
  categoryName,
  setCategoryName,
  messageCategories,
  handleCreateCategory,
}: CategorySectionProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">

      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Message Categories
        </h2>

        <p className="mt-2 text-gray-500">
          Create and manage communication categories
        </p>

      </div>



      {/* CREATE CATEGORY */}

      <div className="rounded-2xl border bg-gray-50 p-6">

<div className="mb-6">

  <label className="mb-2 block text-lg font-semibold text-gray-700">
    Select Group
  </label>

  <select
    value={selectedGroup}
    onChange={(e) => {

  onGroupChange(e.target.value)

}}

    className="w-full rounded-xl border p-4 text-lg outline-none transition focus:border-blue-500"
  >
    <option value="">
      Select Group
    </option>

    {groups.map((group) => (
      <option
        key={group.id}
        value={group.id}
      >
        {group.name} {group.section}
      </option>
    ))}
  </select>

</div>
        <h3 className="mb-4 text-2xl font-semibold text-gray-700">
          Create New Category
        </h3>

        <div className="flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) =>
              setCategoryName(e.target.value)
            }
            className="flex-1 rounded-xl border p-4 text-lg outline-none transition focus:border-blue-500"
          />

          <button
            onClick={handleCreateCategory}
            className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Create Category
          </button>

        </div>

      </div>

      {/* CATEGORY LIST */}

      <div className="mt-10">

        <h3 className="mb-5 text-2xl font-semibold text-gray-700">
          Existing Categories
        </h3>

        {messageCategories.length === 0 ? (

          <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
            No categories created yet.
          </div>

        ) : (

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

            {messageCategories.map((category) => (

              <div
                key={category.id}
                className="rounded-2xl border bg-gradient-to-r from-blue-50 to-white p-6 shadow-sm transition hover:shadow-lg"
              >

                <h4 className="text-2xl font-bold text-blue-700">
                  {category.name}
                </h4>

                <p className="mt-3 text-sm text-gray-500">
                  Communication Category
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
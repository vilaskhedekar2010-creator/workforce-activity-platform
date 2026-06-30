type MessageSectionProps = {
  groups: any[];
  categories: any[];

  selectedGroup: string;
  setSelectedGroup: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  title: string;
  setTitle: (value: string) => void;

  message: string;
  setMessage: (value: string) => void;

  deadline: string;
  setDeadline: (value: string) => void;

  onGroupChange: (groupId: string) => void;

  handleSendMessage: () => void;
};

export default function MessageSection({
  groups,
  categories,

  selectedGroup,
  setSelectedGroup,

  selectedCategory,
  setSelectedCategory,

  title,
  setTitle,

  message,
  setMessage,

  deadline,
  setDeadline,

  onGroupChange,

  handleSendMessage,
}: MessageSectionProps) {

  return (

    <div className="rounded-2xl bg-white p-8 shadow-lg">

      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Send Message
        </h2>

        <p className="mt-2 text-gray-500">
          Send announcements and important communication to members
        </p>

      </div>

      {/* FORM */}

      <div className="space-y-6">

        {/* GROUP */}

        <div>

          <label className="mb-2 block text-lg font-semibold text-gray-700">
            Select Group
          </label>

          <select
            value={selectedGroup}
            onChange={(e) => {

                onGroupChange(e.target.value);

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

        {/* CATEGORY */}

        <div>

          <label className="mb-2 block text-lg font-semibold text-gray-700">
            Select Category
          </label>

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-4 text-lg outline-none transition focus:border-blue-500"
          >

            <option value="">
              Select Category
            </option>

            {categories.map((category) => (

              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>

            ))}

          </select>

        </div>

        {/* TITLE */}

        <div>

          <label className="mb-2 block text-lg font-semibold text-gray-700">
            Message Title
          </label>

          <input
            type="text"
            placeholder="Enter message title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-4 text-lg outline-none transition focus:border-blue-500"
          />

        </div>

        {/* MESSAGE */}

        <div>

          <label className="mb-2 block text-lg font-semibold text-gray-700">
            Message Content
          </label>

          <textarea
            rows={8}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-4 text-lg outline-none transition focus:border-blue-500"
          />

        </div>

        {/* DEADLINE */}

        <div>

          <label className="mb-2 block text-lg font-semibold text-gray-700">
            Acknowledgement Deadline
          </label>

          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) =>
              setDeadline(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-4 text-lg outline-none transition focus:border-blue-500"
          />

        </div>

        {/* BUTTON */}

        <div className="pt-4">

          <button
            onClick={handleSendMessage}
            className="rounded-2xl bg-green-600 px-10 py-4 text-xl font-semibold text-white transition hover:bg-green-700"
          >
            Send Message
          </button>

        </div>

      </div>

    </div>

  );

}
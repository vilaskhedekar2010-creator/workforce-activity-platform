"use client";

interface SaveToolbarProps {

  onSelectAll: () => void;

  onClearAll: () => void;

  onSave: () => void;

  disabled?: boolean;

}

export default function SaveToolbar({

  onSelectAll,

  onClearAll,

  onSave,

  disabled=false,

}: SaveToolbarProps){

  return(

    <div className="sticky top-0 z-10 mb-6 flex items-center justify-between rounded-lg border bg-white p-4 shadow">

      <div className="flex gap-3">

        <button
          onClick={onSelectAll}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Select All
        </button>

        <button
          onClick={onClearAll}
          className="rounded bg-gray-600 px-4 py-2 text-white"
        >
          Clear All
        </button>

      </div>

      <button
        disabled={disabled}
        onClick={onSave}
        className="rounded bg-green-600 px-6 py-2 font-semibold text-white"
      >
        Save Role Actions
      </button>

    </div>

  );

}
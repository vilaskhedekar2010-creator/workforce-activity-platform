"use client";

import ActionCheckbox from "./ActionCheckbox";

interface ActionItem {
  id: string;
  module: string;
  action: string;
  code: string;
}

interface ModuleActionCardProps {
  module: string;

  actions: ActionItem[];

  selectedActions: string[];

  onToggleAction: (
    actionId: string,
    checked: boolean
  ) => void;

  onToggleModule: (
    module: string,
    checked: boolean
  ) => void;
}

export default function ModuleActionCard({
  module,
  actions,
  selectedActions,
  onToggleAction,
  onToggleModule,
}: ModuleActionCardProps) {

  const allSelected =
    actions.length > 0 &&
    actions.every(action =>
      selectedActions.includes(action.id)
    );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="text-lg font-semibold">
          {module}
        </h3>

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) =>
              onToggleModule(
                module,
                e.target.checked
              )
            }
          />

          <span className="text-sm font-medium">
            Select All
          </span>

        </label>

      </div>

      <div className="grid grid-cols-3 gap-3">

        {actions.map(action => (

          <ActionCheckbox
            key={action.id}
            id={action.id}
            label={action.action}
            checked={
              selectedActions.includes(
                action.id
              )
            }
            onChange={onToggleAction}
          />

        ))}

      </div>

    </div>
  );

}
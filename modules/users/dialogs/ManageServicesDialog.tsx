import { useEffect, useState } from "react";
import { ALL_SERVICES } from "@/shared/constants/services";

import {
  getUserServices,
  saveUserServices,
} from "@/services/permission.service";

type ManageServicesDialogProps = {
  open: boolean;
  onClose: () => void;
  user: any;
};

export default function ManageServicesDialog({
  open,
  onClose,
  user,
}: ManageServicesDialogProps) {


    const [
  selectedServices,
  setSelectedServices,
] = useState<string[]>([]);

useEffect(() => {

  if (!open || !user) return;

  loadUserServices();

}, [open, user]);

const loadUserServices = async () => {

  const services =
    await getUserServices(user.id);

  setSelectedServices(services);

};

const handleSave = async () => {

  const success = await saveUserServices(
    user.id,
    selectedServices
  );

  if (success) {

    alert("Services updated successfully.");

    onClose();

  } else {

    alert("Failed to update services.");

  }

};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-2xl rounded-lg bg-white p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Manage Services
        </h2>

        <div className="mb-6 space-y-2">

          <p>
            <strong>Name:</strong> {user?.full_name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Role:</strong> {user?.role}
          </p>

        </div>

        {/* Services will be added here */}
        <div className="mt-6 grid grid-cols-2 gap-3">

            {ALL_SERVICES.map((service) => (

                <label
                key={service.code}
                className="flex items-center gap-2 rounded border p-2 hover:bg-gray-50"
                >

                <input
                    type="checkbox"
                    checked={selectedServices.includes(service.code)}
                    onChange={() => {

                            if (selectedServices.includes(service.code)) {
                                setSelectedServices(
                                selectedServices.filter(
                                    (s) => s !== service.code
                                )
                                );
                            } else {
                                setSelectedServices([
                                ...selectedServices,
                                service.code,
                                ]);
                            }
                      }}
                />

                <span>{service.name}</span>

                </label>

            ))}

            </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );

}
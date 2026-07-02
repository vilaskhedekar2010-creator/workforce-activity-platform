type ProfileModalProps = {

  profile: any;

  fullName: string;
  setFullName: (value: string) => void;

  mobileNumber: string;
  setMobileNumber: (value: string) => void;

  address: string;
  setAddress: (value: string) => void;

  setShowProfileModal: (value: boolean) => void;

  handleUpdateProfile: () => void;

};

export default function ProfileModal({

  profile,

  fullName,
  setFullName,

  mobileNumber,
  setMobileNumber,

  address,
  setAddress,

  setShowProfileModal,

  handleUpdateProfile,

}: ProfileModalProps) {

  return (

    <>

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

              <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">

                <h2 className="mb-5 text-2xl font-bold">

                  Edit Profile

                </h2>

                <div className="mb-4">

                  <label className="mb-1 block font-semibold text-gray-700">

                    Faculty ID

                  </label>

                  <input
                    type="text"
                    value={profile?.employee_id || ""}
                    disabled
                    className="w-full rounded border bg-gray-100 p-3 text-gray-600"
                  />

                </div>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  className="mb-4 w-full rounded border p-3"
                />

                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(
                      e.target.value
                    )
                  }
                  className="mb-4 w-full rounded border p-3"
                />

                <textarea
                  placeholder="Address"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  className="mb-4 w-full rounded border p-3"
                  rows={4}
                />

                <div className="flex justify-end gap-3">

                  <button
                    onClick={() =>
                      setShowProfileModal(
                        false
                      )
                    }
                    className="rounded bg-gray-400 px-4 py-2 text-white"
                  >

                    Cancel

                  </button>

                  <button
                    onClick={
                      handleUpdateProfile
                    }
                    className="rounded bg-green-600 px-4 py-2 text-white"
                  >

                    Save

                  </button>

                </div>

              </div>

            </div>

    </>

  );

}
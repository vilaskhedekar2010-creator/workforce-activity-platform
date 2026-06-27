type ResetPasswordModalData = {
  showResetPasswordModal: boolean;

  resetPassword: string;
  confirmResetPassword: string;

  setShowResetPasswordModal: (
    value: boolean
  ) => void;

  setResetPassword: (
    value: string
  ) => void;

  setConfirmResetPassword: (
    value: string
  ) => void;

  setSelectedUserId: (
    value: string
  ) => void;

  handleResetPassword: () => void;
};

type ResetPasswordModalProps = {
  resetPasswordModal: ResetPasswordModalData;
};

export default function ResetPasswordModal({
  resetPasswordModal,
}: ResetPasswordModalProps) {

  const {
    showResetPasswordModal,

    resetPassword,
    confirmResetPassword,

    setShowResetPasswordModal,
    setResetPassword,
    setConfirmResetPassword,
    setSelectedUserId,

    handleResetPassword,
  } = resetPasswordModal;

  if (!showResetPasswordModal) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

        <h2 className="mb-5 text-2xl font-bold">

          Reset Password

        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={resetPassword}
          onChange={(e) =>
            setResetPassword(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmResetPassword}
          onChange={(e) =>
            setConfirmResetPassword(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-3"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={() => {

              setShowResetPasswordModal(
                false
              );

              setResetPassword("");

              setConfirmResetPassword("");

              setSelectedUserId("");

            }}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >

            Cancel

          </button>

          <button
            onClick={handleResetPassword}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >

            Reset Password

          </button>

        </div>

      </div>

    </div>

  );

}
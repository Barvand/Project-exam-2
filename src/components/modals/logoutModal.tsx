// components/LogoutConfirmModal.tsx
import React from "react";

interface LogoutConfirmModalProps {
  onCancel: () => void;
  onLogout: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  onCancel,
  onLogout,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800">Are you sure?</h2>
        <p className="text-gray-600 mt-2">Do you really want to log out?</p>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;

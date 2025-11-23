import { useState } from "react";
import { FaEllipsisV, FaUniversity } from "react-icons/fa";

type AccountCardProps = {
  id: string;
  accountName: string;
  amount: number;
  description: string;
  onDelete?: () => void;
};

const AccountCard = ({
  accountName,
  amount,
  description,
  onDelete,
}: AccountCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xs flex flex-col justify-between bg-white p-4 rounded-xl shadow-xl border border-gray-300">
      {/* Top: Icon and menu */}
      <div className="flex justify-between items-start">
        <FaUniversity className="text-orange-600 text-3xl flex-shrink-0" />
        <div className="relative">
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <FaEllipsisV
              size={18}
              className="text-gray-500 hover:text-gray-700"
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={onDelete}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account info */}
      <div className="mt-4">
        <h1 className="font-semibold text-gray-800 text-lg truncate">
          {accountName}
        </h1>
        <p className="text-gray-600 text-sm truncate">{description}</p>
        <p className="font-bold text-gray-900 text-xl mt-2 break-words">
          ${amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AccountCard;

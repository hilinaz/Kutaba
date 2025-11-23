import { useState } from "react";
import {
  FaMedal,
  FaPiggyBank,
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaSignOutAlt,
  FaUserCircle,
  FaFileExport,

  FaPen,
} from "react-icons/fa";
import { LogOut } from "../../auth/services/LogOut";
import { useAuth } from "../../auth/services/AuthContext";

const ProfilePage = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [updateProfile, setUpdateProfile] = useState(false);
  const {user}=useAuth()

const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  }
};

 const handleLogOut=()=>{
  LogOut();
 }

  return (
    <div className="bg-[#fefefe] min-h-screen w-full py-10 px-8">
      <h1 className="font-bold text-3xl mb-8">Your Profile</h1>

      <div className="flex justify-between items-center bg-white shadow-lg rounded-xl px-8 py-8 w-full">
        <div className="relative flex items-center gap-6">
          {/* Profile Photo */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
            {photoUrl ? (
              <img src={photoUrl} className="w-full h-full object-cover" />
            ) : (
              <FaUserCircle className="text-gray-500 text-7xl" />
            )}

            {updateProfile && (
              <>
                <label
                  htmlFor="upload-photo"
                  className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-medium cursor-pointer"
                >
                  <FaPen></FaPen>
                </label>
                <input
                  type="file"
                  id="upload-photo"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </>
            )}
          </div>

          <div>
            <h2 className="font-semibold text-2xl">
              {user?.displayName || "Full Name"}
            </h2>
            <p className="text-gray-500 text-base">
              {user?.email || "email@example.com"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {updateProfile ? (
            <>
              {/* Save Button */}
              <button
                onClick={() => {
                  // Save logic here (e.g., upload photo to Firebase)
                  console.log("Save clicked");
                  setUpdateProfile(false); // exit edit mode after saving
                }}
                className="bg-green-500 text-white px-4 py-3 rounded-lg shadow hover:bg-green-600 flex items-center gap-2 transition"
              >
                Save
              </button>

              {/* Cancel Button */}
              <button
                onClick={() => setUpdateProfile(false)}
                className="bg-gray-300 text-black px-4 py-3 rounded-lg shadow flex items-center gap-2 transition hover:opacity-90"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setUpdateProfile(true)}
              className="bg-[#ea580c] text-white px-4 py-3 rounded-lg shadow flex items-center gap-2 transition hover:opacity-90"
            >
              <FaPen />
            </button>
          )}

          {/* Logout button */}
          <button
            className="bg-[#ea580c] text-white px-6 py-3 rounded-lg shadow hover:bg-[#d94e09] flex items-center gap-2 transition"
            onClick={handleLogOut}
          >
            <FaSignOutAlt />
            Log Out
          </button>
        </div>
      </div>

      {/* Financial Snapshot */}
      <div className="bg-white shadow-lg rounded-xl mt-10 p-8 w-full">
        <h2 className="font-bold text-2xl mb-6">Financial Snapshot</h2>

        <div className="bg-[#fff7ed] border-l-4 border-[#ea580c] rounded-xl text-center py-8 mb-10">
          <p className="text-gray-600 text-lg">Total Net Worth</p>
          <h3 className="text-[#ea580c] text-4xl font-bold mt-1">
            ETB XXXXXXXX
          </h3>
        </div>

        {/* Account Info Section */}
        <h2 className="font-bold text-2xl mb-5">Account Information</h2>

        {[
          {
            title: "Saving Goals",
            desc: "Your current saving progress",
            icon: <FaPiggyBank className="text-[#ea580c] text-3xl" />,
          },
          {
            title: "Budget Information",
            desc: "Monthly Budget Overview",
            icon: <FaWallet className="text-[#ea580c] text-3xl" />,
          },
          {
            title: "Total Income",
            desc: "Income gained this month",
            icon: <FaMoneyBillWave className="text-[#ea580c] text-3xl" />,
          },
          {
            title: "Total Expense",
            desc: "Expense summary this month",
            icon: <FaChartLine className="text-[#ea580c] text-3xl" />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-6 mb-4 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition w-full"
          >
            <div className="flex items-center gap-5">
              {item.icon}
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
            <h3 className="font-semibold text-lg">ETB XXXXXX</h3>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-white shadow-lg rounded-xl mt-10 p-8 w-full">
        <h2 className="font-bold text-2xl mb-6 flex items-center gap-3">
          <FaMedal size={25} className="text-[#ea580c]" />
          Achievements
        </h2>

        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#fefce8] rounded-full px-8 py-5 shadow-sm text-gray-700 text-base"
            >
              Achievement detail {i}
            </div>
          ))}
        </div>
      </div>

      {/* Export Section */}
      <div className="mt-10 w-full">
        <h2 className="font-bold text-2xl mb-5">Data Summary</h2>
        <button className="w-full py-5 border border-gray-300 shadow-md rounded-lg hover:bg-gray-100 transition font-medium flex items-center justify-center gap-2 text-lg">
          <FaFileExport />
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

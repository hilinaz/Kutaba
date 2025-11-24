import { useState, useEffect } from "react";
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

import { useAuth } from "../../auth/services/AuthContext";
import { LogOut } from "../../auth/services/LogOut";
import { editProfileService } from "../services/editProfile";
import { auth } from "../../../app/firebase";

const ProfilePage = () => {
  const { user } = useAuth();

  const [updateProfileMode, setUpdateProfileMode] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");

  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (user && !updateProfileMode) {
      setPhotoPreview(user.photoURL || "");
      setNewDisplayName(user.displayName || "");
    }
  }, [user, updateProfileMode]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setImageError(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await editProfileService(
        newDisplayName.trim() || user?.displayName || "",
        photoFile
      );

      await auth.currentUser?.reload();
      const freshUser = auth.currentUser;

      if (freshUser) {
        const timestamp = new Date().getTime();
        const freshPhotoURL = freshUser.photoURL
          ? `${freshUser.photoURL}?t=${timestamp}`
          : "";

        setPhotoPreview(freshPhotoURL);
        setNewDisplayName(freshUser.displayName || "");
      }

      setUpdateProfileMode(false);
      setPhotoFile(null);
      setImageError(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    LogOut();
  };

  return (
    <div className="bg-[#fefefe] min-h-screen w-full py-10 px-8">
      <h1 className="font-bold text-3xl mb-8">Your Profile</h1>

      {/* PROFILE HEADER */}
      <div className="flex justify-between items-center bg-white shadow-lg rounded-xl px-8 py-8 w-full">
        <div className="flex items-center gap-6">
          {/* Profile Picture Section */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
            {photoPreview && !imageError ? (
              <img
                key={photoPreview}
                src={photoPreview}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <FaUserCircle className="text-gray-500 text-7xl" />
            )}

            {updateProfileMode && (
              <>
                <label
                  htmlFor="upload-photo"
                  className="absolute inset-0 bg-black/60 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition"
                  title="Change Photo"
                >
                  <FaPen />
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

          {/* Name + Email Section */}
          <div>
            {updateProfileMode ? (
              <input
                type="text"
                placeholder={user?.displayName || "Full Name"}
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                className="border-b-2 border-[#ea580c] text-2xl font-semibold outline-none bg-transparent"
              />
            ) : (
              <h2 className="font-semibold text-2xl">
                {newDisplayName || user?.displayName || "Full Name"}
              </h2>
            )}

            <p className="text-gray-500 text-base">
              {user?.email || "email@example.com"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {updateProfileMode ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-3 rounded-lg shadow transition`}
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setUpdateProfileMode(false);
                  setPhotoFile(null);
                  setPhotoPreview(user?.photoURL || "");
                  setNewDisplayName(user?.displayName || "");
                  setImageError(false);
                }}
                disabled={loading}
                className="bg-gray-300 px-4 py-3 rounded-lg shadow hover:opacity-90 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setUpdateProfileMode(true)}
              className="bg-[#ea580c] text-white px-4 py-3 rounded-lg shadow hover:opacity-90 transition"
            >
              <FaPen />
            </button>
          )}

          <button
            onClick={handleLogOut}
            className="bg-[#ea580c] text-white px-6 py-3 rounded-lg shadow hover:bg-[#d94e09] flex items-center gap-2 transition"
          >
            <FaSignOutAlt />
            Log Out
          </button>
        </div>
      </div>

      {/* FINANCIAL SNAPSHOT */}
      <div className="bg-white shadow-lg rounded-xl mt-10 p-8 w-full">
        <h2 className="font-bold text-2xl mb-6">Financial Snapshot</h2>

        <div className="bg-[#fff7ed] border-l-4 border-[#ea580c] rounded-xl text-center py-8 mb-10">
          <p className="text-gray-600 text-lg">Total Net Worth</p>
          <h3 className="text-[#ea580c] text-4xl font-bold mt-1">
            ETB XXXXXXXX
          </h3>
        </div>

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

      {/* ACHIEVEMENTS */}
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

      {/* EXPORT */}
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

import {
  FaChartBar,
  FaChartPie,

  FaExchangeAlt,
  FaHome,
  FaPiggyBank,
  FaTags,
  FaWallet,
} from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const MainSideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: "Overview", path: "/home", icon: <FaHome /> },
    { name: "Transactions", path: "/transactions", icon: <FaExchangeAlt /> },
    { name: "Categories", path: "/categories", icon: <FaTags /> },
    { name: "Budget", path: "/budget", icon: <FaChartPie /> },
    { name: "Accounts", path: "/accounts", icon: <FaWallet /> },
    { name: "Savings", path: "/savings", icon: <FaPiggyBank /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Profile", path: "/profile", icon: <FaPerson/> },
  ];

  return (
    <div className="w-60 bg-white shadow-lg h-screen flex flex-col p-4 border-r border-gray-100 ml-5">
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item) => {
            const isActive =
              currentPath === item.path ||
              (item.path === "/overview" && currentPath === "/");
            return (
              <li key={item.name} className="mb-2">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition duration-200 ease-in-out
                    ${
                      isActive
                        ? "bg-orange-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MainSideBar;



import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import MainSideBar from "../components/MainSideBar";

const MainLayout = () => {
  return (
    <div className="bg-[#eceff4]">
      <div className="mt-8 ml-4 mr-4 mb-2">
        <MainNav />
      </div>
      <div className="flex gap-4">
        <MainSideBar />
       <Outlet/>
      </div>
    </div>
  );
}

export default MainLayout

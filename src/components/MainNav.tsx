
import { MoreVertical } from 'lucide-react';
import logo from '../assets/logo.png'
import { useAuth } from '../features/auth/services/AuthContext';
const MainNav = () => {
  const {user}=useAuth()
  if (!user){
    return 
  }
  return (
    <div className="bg-white shadow-xl p-4 flex justify-between rounded-t-2xl ">
      <div className="items-center flex gap-2">
        <img src={logo} alt="" className="w-10 rounded-full" />
        <p className="font-bold text-lg">Kutaba</p>
      </div>
      <div className="flex gap-4">
        <p className="text-gray">{user.displayName}</p>
        <img  src={user.photoURL?user.photoURL:undefined} alt="" className="w-15 rounded-full" />
        <button className="p-2 hover:bg-gray-200 rounded ml-5">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
}

export default MainNav

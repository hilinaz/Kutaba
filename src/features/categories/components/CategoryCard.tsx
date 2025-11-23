import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Icon } from "@iconify/react";

type CategoryCardProps = {
  id:string
  catName: string;
  catIcon?: string; 
  onEdit?: () => void;
  onDelete?: () => void;
};

const CategoryCard = ({
 
  catName,
  catIcon,
  onEdit,
  onDelete,
}: CategoryCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-64 h-30 flex items-center justify-between bg-white p-3 rounded-xl shadow-xl border border-gray-300" >
  
      <div className="flex items-center gap-4">
        {catIcon && (
          <Icon icon={catIcon} className="text-orange-600 text-4xl" />
        )}
        <h1 className="font-medium text-gray-800 text-xl">{catName}</h1>
      </div>

    
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
              onClick={onEdit }
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
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
  );
};

export default CategoryCard;

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import AddCategoryCard from "../components/AddCategory";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../app/firebase";
import { useAuth } from "../../auth/services/AuthContext";
import CategoryCard from "../components/CategoryCard";
import { deteteCategory } from "../service/deleteCategory";
import ExpensePieChart from "../../transactions/components/chart";

type categoryData = {
  id: string;
  category: string;
  description: string;
  icon?: string;
};

const CategoriesPage = () => {
  const [showCard, setShowCard] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<categoryData | null>(null);
  const { user } = useAuth();

  const [categories, setCategories] = useState<categoryData[]>([]);


  const fetchCategories = async () => {
    if (!user) return;
    const collectionRef = collection(db, "users", user.uid, "categories");
    const snapShot = await getDocs(collectionRef);
    const categoryList = snapShot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as categoryData)
    );
    setCategories(categoryList);
  };

  useEffect(() => {
    if (!user) return;
    fetchCategories();
    const subscribe = onSnapshot(
      collection(db, "users", user.uid, "categories"),
      (data) => {
        const catList = data.docs.map(
          (d) => ({ id: d.id, ...d.data() } as categoryData)
        );
        setCategories(catList);
      }
    );
    return () => subscribe();
  }, [user]);



  const onDelete = (id: string) => {
    deteteCategory(id, user);
  };

  const onEdit = (
    id: string,
    category: string,
    description: string,
    icon?: string
  ) => {
    const categoryDataItem: categoryData = {
      id,
      category,
      icon,
      description,
    };
    setUpdateInfo(categoryDataItem);
    setShowCard(true);
  };

  const handleClose = () => {
    setShowCard(false);
    setUpdateInfo(null); 
  };

  return (
    <div className="bg-[#fefefe] p-3 w-full mr-5">
      <div className="flex justify-between m-3">
        <h1 className="font-bold text-2xl">Categories</h1>
        <button
          className="rounded-full border px-5 py-2 flex gap-2 items-center bg-[#e7643b] text-white"
          onClick={() => {
            setUpdateInfo(null);
            setShowCard(true);
          }}
        >
          <FaPlus color="white" />
          Add Category
        </button>
      </div>

      {/* Stats section */}
      <div className="flex gap-5">
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300 h-48">
          <p>Total Categories: {categories.length}</p>
        </div>
        <div className="shadow-xl rounded-xl w-1/3 p-3 border border-gray-300 h-48">
          <p>Top Category: </p>
        </div>
        <div className="w-1/3 h-42">
          <ExpensePieChart />
        </div>
      </div>

      {/* Category list */}
      <div className="mt-8 mx-5">
        <h1 className="font-semibold text-lg">Your categories</h1>
        <div
          className="mx-5 my-3 grid gap-5 
            grid-cols-1   
            sm:grid-cols-2
            md:grid-cols-3"
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              catName={cat.category}
              catIcon={cat.icon}
              onDelete={() => onDelete(cat.id)}
              onEdit={() =>
                onEdit(cat.id, cat.category, cat.description, cat.icon)
              }
              id={cat.id}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showCard && (
        <AddCategoryCard
          onClose={handleClose}
          catItem={updateInfo ?? undefined}
        />
      )}
    </div>
  );
};

export default CategoriesPage;

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { saveCategoryService } from "../service/saveCategory";
import { editCategory } from "../service/editCategory";
import { useAuth } from "../../auth/services/AuthContext";
import type { CategoryData } from "../../../types/CategoryData";



type AddCategoryProps = {
  catItem?: CategoryData;
  onClose: () => void;
};

const AddCategoryCard = ({ onClose, catItem }: AddCategoryProps) => {
  const form = useForm<CategoryData>();
  const { register, formState, watch, handleSubmit, reset } = form;
  const { errors, isSubmitSuccessful } = formState;
  const categoryName = watch("category");

  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  // Prefill when editing
  useEffect(() => {
    if (catItem) {
      reset({
        category: catItem.category,
        description: catItem.description,
      });
      setSelectedIcon(catItem.icon || null);
    }
  }, [catItem, reset]);

  // Reset form after successful submit
  useEffect(() => {
    if (isSubmitSuccessful && !catItem) {
      reset();
      setSelectedIcon(null);
    }
  }, [isSubmitSuccessful, reset, catItem]);

  // Fetch icon suggestions
  useEffect(() => {
    const fetchIcons = async () => {
      if (!categoryName) {
        setIcons([]);
        return;
      }
      try {
        const res = await fetch(
          `https://api.iconify.design/search?query=${encodeURIComponent(
            categoryName
          )}`
        );
        const data = await res.json();
        setIcons(data?.icons?.slice(0, 12) || []);
      } catch (err) {
        console.error("Error fetching icons:", err);
      }
    };

    const delayDebounce = setTimeout(fetchIcons, 400);
    return () => clearTimeout(delayDebounce);
  }, [categoryName]);

  // Handle adding
  const onSubmit = async (data: CategoryData) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await saveCategoryService(
        user,
        data.category,
        data.description,
        selectedIcon || ""
      );
      reset();
      setSelectedIcon(null);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle editing
  const onEdit = async (data: CategoryData) => {
    if (!user || !catItem?.id) return;
    setIsSaving(true);
    try {
      await editCategory(
        catItem.id,
        user,
        data.category,
        data.description,
        selectedIcon || catItem.icon || ""
      );
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-5">
          <h1 className="font-bold text-xl text-gray-800">
            {catItem ? "Update Category" : "Add Category"}
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Category Input */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-orange-600">
              {(selectedIcon || catItem?.icon) && (
                <Icon
                  icon={selectedIcon || catItem?.icon!}
                  className="text-orange-600 text-xl ml-1"
                />
              )}
              <input
                type="text"
                placeholder="e.g. Food"
                className="flex-1 p-3 focus:outline-none"
                {...register("category", {
                  required: "Enter the name of your category",
                })}
              />
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}

            {/* Icon Suggestions */}
            {icons.length > 0 && (
              <div className="grid grid-cols-6 gap-3 mt-3">
                {icons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`p-2 rounded-lg border transition ${
                      selectedIcon === icon
                        ? "border-orange-600 bg-orange-50"
                        : "border-gray-200 hover:border-orange-500"
                    }`}
                  >
                    <Icon icon={icon} className="text-xl text-gray-700" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description / Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Dinner with friends"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
              {...register("description", {
                required: "Enter description of the category",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-200"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(catItem ? onEdit : onSubmit)}
            className="relative rounded-full px-6 py-3 bg-orange-600 text-white font-semibold hover:bg-orange-700 transition duration-200 shadow-md shadow-orange-200 flex items-center justify-center"
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : catItem ? (
              "Update Category"
            ) : (
              "Save Category"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryCard;

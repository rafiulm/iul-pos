import { useData } from "../../context/DataContext";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  const { categories } = useData();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-slate-600 mb-3">Categories</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
              selectedCategory === category
                ? "bg-slate-900 text-white border-slate-900 shadow-md transform scale-105"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

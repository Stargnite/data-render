import { useEffect, useState } from "react";
import { useAuth } from "./../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type CategoriesType = {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon_url: string;
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://consultapi.vindove.com/api/v1/admin/service-categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/vnd.api+json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setCategories(data.data);
        console.log("Service categories data>>>>>>>>>>>>>>", data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  });
  return (
    <div className="p-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white transition-all bg-gray-900 p-3 rounded-md hover:text-gray-500"
      >
        <span>←</span>
        Back to services
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((category: CategoriesType) => (
          <div className="m-5 max-w-[300px]" key={category.id}>
            <div className="">
              <img src={category.icon_url} alt={category.name} />
              <h1>{category.name}</h1>
            </div>
            <p>{category.description}</p>
            <p>{category.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;

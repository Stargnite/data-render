import { useEffect, useState } from "react";
import { useAuth } from "./../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CategoriesType = {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon_url: string;
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  });
  return (
    <div className="p-5 bg-blue-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white cursor-pointer transition-all bg-[#4C6EF5] p-3 rounded-md hover:bg-blue-400"
      >
        <span>←</span>
        Back to services
      </button>
      {isLoading ? (
        <div className="flex justify-center items-center h-40 text-gray-700">
          <p className="text-2xl text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
            {categories.map((category: CategoriesType) => (
              <Card
                className="flex flex-col items-start shadow-lg border-0"
                key={category.id}
              >
                <CardHeader className="">
                  <CardTitle className="flex flex-col items-center justify-center gap-y-5">
                    <div className="mx-auto max-w-[250px] max-h-[250px] w-full flex items-end justify-center text-center">
                    <img
                      src={category.icon_url}
                      alt={category.name}
                      className=""
                    />
                    </div>
                    <h1 className="text-semibold text-2xl">{category.name}</h1>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <p>{category.description}</p>
                  </CardDescription>
                  <p>{category.slug}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;

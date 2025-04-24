import { useEffect, useState } from "react";
import { useAuth } from "./../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   // CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const [search, setSearch] = useState("");

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
        // console.log("Service categories data>>>>>>>>>>>>>>", data.data);
        setIsLoading(false);
        console.log(isLoading)
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  });

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 bg-blue-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white cursor-pointer transition-all bg-[#4C6EF5] p-3 rounded-md hover:bg-blue-400"
      >
        <span>←</span>
        Back to services
      </button>
      {/* {isLoading && (
        <div className="flex justify-center items-center h-40 text-gray-700">
          <p className="text-2xl text-gray-700">Loading...</p>
        </div>
      )} */}
      {/* <div className="flex items-center justify-center w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
          {categories.map((category: CategoriesType) => (
            <Card
              className="flex flex-col items-start shadow-lg border-0 bg-white"
              key={category.id}
            >
              <CardHeader className="">
                <CardTitle className="flex flex-col items-center justify-center gap-y-5">
                  <div className="">
                    <img
                      src={category.icon_url}
                      alt={category.name}
                      className="container mx-auto max-w-[100px] max-h-[100px]"
                    />
                  </div>
                  <h1 className="text-semibold text-2xl whitespace-nowrap">{category.name}</h1>
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
      </div> */}
      <div className="rounded-md border overflow-x-auto bg-white text-gray-700">
        <div className="p-4">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="text-xl">
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="flex items-center gap-x-3">
                  <img
                    src={category.icon_url}
                    alt={category.name}
                    className="max-w-[30px] max-h-[30px] object-contain"
                  />
                  <p className="font-semibold text-lg whitespace-nowrap">
                    {category.name}
                  </p>
                </TableCell>
                <TableCell className="max-w-[300px] text-sm">
                  {category.description}
                </TableCell>
                <TableCell>{category.slug}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesPage;

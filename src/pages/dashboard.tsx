import { AppSidebar } from "../components/sidebar";
import { Navbar } from "../components/navbar";
import { ServicesTable } from "../components/services-table";
import { SidebarInset } from "@/components/ui/sidebar";
import type { Service } from "../lib/types";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function AdminDashboard() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalServices, setTotalServices] = useState<number>(0);
  const { token } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://consultapi.vindove.com/api/v1/admin/services?page=${pageNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/vnd.api+json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setServices(data.data.data);
        console.log(data.data.data);
        setIsLoading(false);
        setTotalServices(data.data.total);
      } catch (error) {
        console.error("Error fetching services:", error);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [pageNumber]);

  const updateService = (id: string, updatedService: Partial<Service>) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, ...updatedService } : service
      )
    );
  };

  return (
    <div className="flex h-screen bg-background w-full bg-blue-50  text-gray-800">
      <AppSidebar />
      <SidebarInset className="">
        <div className="flex flex-col w-full h-full">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">
                Services Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your service offerings and pricing
              </p>
            </div>
            <div className="grid gap-4 md:gap-8 mb-6 text-white">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border text-card-foreground shadow p-6 bg-[#729efd]">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">
                      Total Services
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">{totalServices}</div>
                </div>
                <div className="rounded-xl border text-card-foreground shadow p-6 bg-[#729efd]">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">
                      Active Services
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">{services.filter((s) => s.status === "ACTIVE").length}</div>
                </div>
                <div className="rounded-xl border text-card-foreground shadow p-6 bg-[#729efd]">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">
                      Inactive Services
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">{services.filter((s) => s.status === "Inactive").length}</div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-2xl text-white">Loading...</p>
              </div>
            ) : (
              <ServicesTable
                services={services}
                updateService={updateService}
              />
            )}
            <div className="flex justify-center gap-x-5 items-center my-5">
              <button
                className={`text-lg text-blue-500 cursor-pointer hover:text-white/50 transition-all ${
                  pageNumber === 1 && "text-gray-700"
                }`}
                onClick={() => setPageNumber(1)}
              >
                1
              </button>
              <button
                className={`text-lg text-blue-500 cursor-pointer hover:text-white/50 transition-all ${
                  pageNumber === 2 && "text-gray-700"
                }`}
                onClick={() => setPageNumber(2)}
              >
                2
              </button>
              <button
                className={`text-lg text-blue-500 cursor-pointer hover:text-white/50 transition-all ${
                  pageNumber === 3 && "text-gray-700"
                }`}
                onClick={() => setPageNumber(3)}
              >
                3
              </button>
            </div>
          </main>
        </div>
      </SidebarInset>
    </div>
  );
}

import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PlansTable } from "@/components/plans-table";
import { Plan } from "@/lib/types";

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://consultapi.vindove.com/api/v1/admin/plans`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/vnd.api+json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setPlans(data.data);
        setIsLoading(false);
        // console.log("Plans data>>>>>>>", data.data);
      } catch (error: any) {
        console.error("Error fetching plan:", error);
        setIsLoading(false);
        // alert("error loading Plans Page");
      } finally {
      }
    };

    fetchPlan();
  });

  const updatePlans = (id: string, updatedPlan: Partial<Plan>) => {
    setPlans(
      plans.map((plan) => (plan.id === id ? { ...plan, ...updatedPlan } : plan))
    );
  };
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-40 text-gray-700">
//         <p className="text-2xl text-gray-700">Loading...</p>
//       </div>
//     );

  return (
    <div>
      <PlansTable plans={plans} updatePlans={updatePlans} />
    </div>
  );
}

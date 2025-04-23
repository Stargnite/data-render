import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PlanType {
  id: string;
  name: string;
  price: number;
  type: string;
  currency: string;
}

type ModalProps = {
  id: string;
  onClose: () => void;
};

const MembershipPlansPage = ({ id, onClose }: ModalProps) => {
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [editForm, setEditForm] = useState<Partial<PlanType>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    console.log("PlansToken and id>>>>>>>>>>>>>", token, id);
    if (!id || !token) alert("No Token or ID"); return;
    const fetchPlan = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://consultapi.vindove.com/api/v1/admin/plans/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setPlan(data.data);
        setEditForm(data.data);
        console.log(data);
        if (!token) {
          alert("Token is missing. Please log in again.");
          return;
        }
      } catch (error) {
        console.error("Error fetching plan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchPlan();
  }, [id, token]);

  const handleChange = (field: keyof PlanType, value: string | number) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!id || !editForm) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `https://consultapi.vindove.com/api/v1/admin/plans/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update plan");
        alert(errorData.message)
      }

      alert("Plan updated successfully!");
    } catch (err: any) {
      console.error("Update error:", err);
      alert("Update failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-5 text-xl">Loading...</div>;
  //   if (!plan) return <div className="p-5 text-xl">Plan not found</div>;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center text-start justify-center z-50 p-5">
      
      
        <div className="mx-auto p-6 border bg-white rounded-lg shadow-lg md:p-6 max-h-[70vh] max-w-[600px] w-full relative  overflow-y-auto
        ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold cursor-pointer"
        >
          ×
        </button>
          <h1 className="text-3xl font-bold text-sky-800 mb-6">
            Edit Plan: {plan?.name}
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sky-700 font-semibold">Name</label>
              <Input
                value={editForm.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-white border border-sky-300"
              />
            </div>

            <div>
              <label className="block text-sky-700 font-semibold">Price</label>
              <Input
                type="number"
                value={editForm.price || 0}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value))
                }
                className="bg-white border border-sky-300"
              />
            </div>

            <div>
              <label className="block text-sky-700 font-semibold">
                Currency
              </label>
              <Input
                value={editForm.currency || ""}
                onChange={(e) => handleChange("currency", e.target.value)}
                className="bg-white border border-sky-300"
              />
            </div>

            <div>
              <label className="block text-sky-700 font-semibold">Type</label>
              <Input
                value={editForm.type || ""}
                onChange={(e) => handleChange("type", e.target.value)}
                className="bg-white border border-sky-300"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default MembershipPlansPage;

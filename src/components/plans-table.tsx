import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plan } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import PlanModal from "@/pages/PlanModal";
// import { useNavigate } from "react-router-dom";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"

interface PlansTableProps {
  plans: Plan[];
  updatePlans: (id: string, updatedPlan: Partial<Plan>) => void;
}

export function PlansTable({ plans, updatePlans }: PlansTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Plan>>({});
  const navigate = useNavigate();
  //   const [showModal, setShowModal] = useState(false);
  //   const [showPlansModal, setShowPlansModal] = useState(false);
  const { token } = useAuth();
  // const navigate = useNavigate();

  const startEditing = (plan: Plan) => {
    setEditingId(plan.id);
    setEditForm({
      name: plan.name,
      price: plan.price,
      type: plan.type,
      currency: plan.currency,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEditing = async (id: string) => {
    try {
      console.log("the edit to be submitted>>>>>>>>.", editForm);

      const response = await fetch(
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

      console.log(editForm);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update service");
      }
      updatePlans(id, editForm);
      alert("Service updated successfully!");
    } catch (error: any) {
      console.error("Error submitting service:", error);
      alert("Submission failed. " + error.message);
    } finally {
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleChange = (field: keyof Plan, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-5 bg-blue-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white cursor-pointer transition-all bg-[#4C6EF5] p-3 rounded-md hover:bg-blue-400"
      >
        <span>←</span>
        Back to services
      </button>
      <div className="rounded-md border overflow-x-auto bg-white text-gray-700">
        <div className="">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead className="sticky right-0 bg-white border-l-[1px] z-10 shadow-md text-end">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    {editingId === plan.id ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="max-w-[200px]"
                      />
                    ) : (
                      <p className="font-semibold">{plan.name}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === plan.id ? (
                      <Input
                        value={editForm.price}
                        onChange={(e) => handleChange("price", e.target.value)}
                        className="max-w-[100px]"
                      />
                    ) : (
                      <p className="max-w-[100px] overflow-hidden">
                        {plan.price}
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    {editingId === plan.id ? (
                      <Input
                        value={editForm.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                        className="max-w-[100px]"
                      />
                    ) : (
                      plan.type
                    )}
                  </TableCell>

                  <TableCell>
                    {editingId === plan.id ? (
                      <Input
                        value={editForm.currency}
                        onChange={(e) =>
                          handleChange("currency", e.target.value)
                        }
                        className="max-w-[100px]"
                      />
                    ) : (
                      plan.currency
                    )}
                  </TableCell>

                  <TableCell className="text-right sticky right-0 border-l-[1px] max-w-3 bg-white z-10">
                    {editingId === plan.id ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => saveEditing(plan.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={cancelEditing}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-blue-200 hover:text-white cursor-pointer"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white text-black"
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => startEditing(plan)}
                            className="cursor-pointer hover:bg-blue-400 hover:text-white transition-all"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem
                          className="cursor-pointer hover:bg-blue-400 hover:text-white transition-all"
                          onClick={() => setShowModal(true)}
                        >
                          <p>{">> "}</p>
                          Full details
                        </DropdownMenuItem> */}

                          {/* <DropdownMenuItem
                          className="cursor-pointer hover:bg-blue-400 hover:text-white transition-all"
                          onClick={() => setShowPlansModal(true)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Plans
                        </DropdownMenuItem> */}

                          <DropdownMenuItem className="cursor-pointer hover:bg-blue-400 hover:text-white transition-all">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>

                        {/* {showPlansModal && (
                        <PlanModal
                          id={plan.id}
                          onClose={() => setShowPlansModal(false)}
                        />
                      )} */}
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

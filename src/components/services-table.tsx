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
import { Service } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"

interface ServicesTableProps {
  services: Service[];
  updateService: (id: string, updatedService: Partial<Service>) => void;
}

export function ServicesTable({ services, updateService }: ServicesTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});
  const navigate = useNavigate();
  const { token } = useAuth();

  const startEditing = (service: Service) => {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      description: service.description,
      email: service.email,
      phone_no: service.phone_no,
      status: service.status,
      country: service.country,
      language: service.language,
      website_url: service.website_url,
      hourly_price: service.hourly_price,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEditing = async (id: string) => {
    try {
      console.log("Token being used>>>>>>>>.", token);

      const response = await fetch(
        `https://consultapi.vindove.com/api/v1/admin/services/${id}`,
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
      updateService(id, editForm);
      alert("Service updated successfully!");
    } catch (error: any) {
      console.error("Error submitting service:", error);
      alert("Submission failed. " + error.message);
    } finally {
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleChange = (field: keyof Service, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="rounded-md border overflow-x-auto max-w-full md:max-w-[79vw] bg-white text-gray-700">
      <div className="">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Price/hour</TableHead>
              <TableHead className="sticky right-0 bg-white border-l-[1px] z-10 shadow-md">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  {editingId === service.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="max-w-[200px]"
                    />
                  ) : (
                    <p className="font-semibold">
                      {service.name}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === service.id ? (
                    <Input
                      value={editForm.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      className="max-w-[100px]"
                    />
                  ) : (
                    <p className="max-w-[100px] overflow-hidden">
                      {service.description}
                    </p>
                  )}
                </TableCell>

                <TableCell>
                  {editingId === service.id ? (
                    <Input
                      value={editForm.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="max-w-[100px]"
                    />
                  ) : (
                    service.email
                  )}
                </TableCell>

                <TableCell>
                  {editingId === service.id ? (
                    <Input
                      value={editForm.phone_no}
                      onChange={(e) => handleChange("phone_no", e.target.value)}
                      className="max-w-[100px]"
                    />
                  ) : (
                    service.phone_no
                  )}
                </TableCell>

                <TableCell>
                  {editingId === service.id ? (
                    <Input
                      value={editForm.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                      className="max-w-[100px]"
                    />
                  ) : (
                    service.status
                  )}
                </TableCell>

                <TableCell>
                  {editingId === service.id ? (
                    <Input
                      value={editForm.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      className="max-w-[100px]"
                    />
                  ) : (
                    service.country
                  )}
                </TableCell>

                <TableCell>
                  {editingId === service.id ? (
                    <Input
                      value={editForm.language}
                      onChange={(e) => handleChange("language", e.target.value)}
                      className="max-w-[100px]"
                    />
                  ) : (
                    service.language
                  )}
                </TableCell>

                <TableCell>
                  {editingId === service.id ? (
                    <Input
                      value={editForm.website_url}
                      onChange={(e) =>
                        handleChange("website_url", e.target.value)
                      }
                      className="max-w-[100px]"
                    />
                  ) : (
                    service.website_url
                  )}
                </TableCell>

                <TableCell>
                  {editingId === service.id ? (
                    <Input
                      value={editForm.hourly_price}
                      onChange={(e) =>
                        handleChange("hourly_price", e.target.value)
                      }
                      className="max-w-[100px]"
                    />
                  ) : (
                    service.hourly_price
                  )}
                </TableCell>

                {/* <TableCell>
                {editingId === service.id ? (
                  <Select value={editForm.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant={service.status === "Active" ? "default" : "secondary"}>{service.status}</Badge>
                )}
              </TableCell> */}
                <TableCell className="text-right sticky right-0 border bg-white z-10 shadow-md">
                  {editingId === service.id ? (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => saveEditing(service.id)}
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/services/${service.id}`)}
                      >
                        Full details {">"}
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-500 cursor-pointer"
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
                          onClick={() => startEditing(service)}
                          className="cursor-pointer hover:bg-gray-400 transition-all"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-gray-400 transition-all"
                          onClick={() => navigate(`/services/${service.id}`)}
                        >
                          <p>{">> "}</p>
                          Full details
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-400 transition-all">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

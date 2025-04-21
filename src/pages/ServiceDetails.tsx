import { useEffect, useState } from "react";
import type { Service } from "./../lib/types";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ServiceDetails() {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://consultapi.vindove.com/api/v1/services/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setService(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    if (id) {
      fetchServiceDetails();
    }
  }, [id]);

  const handleChange = (field: keyof Service, value: string) => {
    if (!service) return;
    setService({ ...service, [field]: value });
  };

  const handleSubmit = async () => {
    if (!service) return;

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `https://consultapi.vindove.com/api/v1/admin/services/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(service),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update service");
      }

      alert("Service updated successfully!");
    } catch (error: any) {
      console.error("Error submitting service:", error);
      alert("Submission failed. " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-5 text-2xl">Loading...</div>;
  if (!service) return <div className="p-5 text-2xl">Service not found</div>;

  return (
    <div className="p-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white transition-all bg-gray-900 p-3 rounded-md hover:text-gray-500"
      >
        <span>←</span>
        Back to services
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">{service.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Service Information</h2>
            <label className="block mb-2">Description</label>
            <input
              className="w-full border rounded p-2"
              value={service.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <label className="block mt-4 mb-2">Service Type</label>
            <input
              className="w-full border rounded p-2"
              value={service.service_type || ""}
              onChange={(e) => handleChange("service_type", e.target.value)}
            />
            <label className="block mt-4 mb-2">Website</label>
            <input
              className="w-full border rounded p-2"
              value={service.website_url || ""}
              onChange={(e) => handleChange("website_url", e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Location & Availability
            </h2>
            <label className="block mb-2">Country</label>
            <input
              className="w-full border rounded p-2"
              value={service.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
            />
            <label className="block mt-4 mb-2">City</label>
            <input
              className="w-full border rounded p-2"
              value={service.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            <label className="block mt-4 mb-2">Start Time</label>
            <input
              className="w-full border rounded p-2"
              value={service.availability_start_time || ""}
              onChange={(e) =>
                handleChange("availability_start_time", e.target.value)
              }
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import type { Service } from "./../lib/types";
// import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type ServiceModalProps = {
  id: string;
  onClose: () => void;
};

export default function ServiceDetails({ id, onClose }: ServiceModalProps) {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center text-start justify-center z-50 p-5">
        <div className="bg-white rounded-lg shadow-lg p-6 max-h-[70vh] max-w-[1000px] w-full relative  overflow-y-auto">
          <div className="p-5 text-2xl">Loading...</div>
        </div>
      </div>
    );


//   if (!isLoading && !service)
//     return (
//       <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center text-start justify-center z-50 p-5">
//         <div className="bg-white rounded-lg shadow-lg p-6 max-h-[70vh] max-w-[1000px] w-full relative  overflow-y-auto">
//           <div className="p-5 text-2xl">Service not found</div>
//         </div>
//       </div>
//     );

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center text-start justify-center z-50 p-5">
      <div className="bg-white rounded-lg shadow-lg md:p-6 max-h-[70vh] max-w-[1000px] w-full relative  overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold cursor-pointer"
        >
          ×
        </button>
        {/* <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white transition-all bg-gray-500 p-2 cursor-pointer rounded-sm"
      >
        <span>←</span>
        Back to services
      </button> */}

        <div className="p-6 text-gray-800">
          <h1 className="text-lg md:text-3xl font-bold mb-6">{service?.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg md:text-xl font-semibold pb-5">
                Service Information
              </h2>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Description</td>
                    <td className="py-3">
                      {service?.description || "No description"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Service category</td>
                    <td className="py-3">{service?.category.name || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Category ID</td>
                    <td className="py-3">
                      {service?.service_category_id || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Website</td>
                    <td className="py-3">{service?.website_url || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Experience</td>
                    <td className="py-3">
                      {service?.year_of_experience || "0"} years
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Language</td>
                    <td className="py-3">{service?.language || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold pb-5">
                Location & Availability
              </h2>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Country</td>
                    <td className="py-3">{service?.country || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">State</td>
                    <td className="py-3">{service?.state || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">City</td>
                    <td className="py-3">{service?.city || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Start Time</td>
                    <td className="py-3">
                      {service?.availability_start_time || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">End Time</td>
                    <td className="py-3">
                      {service?.availability_end_time || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Coordinates</td>
                    <td className="py-3">
                      {service?.latitude && service?.longitude ? (
                        <p>
                          Lattitude:{service?.latitude}, Longitude:
                          {service?.longitude}
                        </p>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg md:text-xl font-semibold pb-5">Subscription Details</h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium">Subscription Type</td>
                  <td className="py-3">
                    {service?.subscription_expires_at || "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Expires At</td>
                  <td className="py-3">
                    {service?.subscription_expires_at || "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Created By</td>
                  <td className="py-3">{service?.created_by || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Created At</td>
                  <td className="py-3">{service?.created_at || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Updated At</td>
                  <td className="py-3">{service?.updated_at || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="p-5">
  //       <button
  //         onClick={() => navigate(-1)}
  //         className="mb-6 flex items-center gap-2 text-white transition-all bg-gray-900 p-3 rounded-md hover:text-gray-500"
  //       >
  //         <span>←</span>
  //         Back to services
  //       </button>

  //       <div className="bg-white rounded-lg shadow-md p-6 text-gray-800">
  //         <h1 className="text-3xl font-bold mb-6">{service.name}</h1>

  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //           <div>
  //             <h2 className="text-xl font-semibold mb-4">Service Information</h2>
  //             <label className="block mb-2">Description</label>
  //             <input
  //               className="w-full border rounded p-2"
  //               value={service.description || ""}
  //               onChange={(e) => handleChange("description", e.target.value)}
  //             />
  //             <label className="block mt-4 mb-2">Service Type</label>
  //             <input
  //               className="w-full border rounded p-2"
  //               value={service.service_type || ""}
  //               onChange={(e) => handleChange("service_type", e.target.value)}
  //             />
  //             <label className="block mt-4 mb-2">Website</label>
  //             <input
  //               className="w-full border rounded p-2"
  //               value={service.website_url || ""}
  //               onChange={(e) => handleChange("website_url", e.target.value)}
  //             />
  //           </div>

  //           <div>
  //             <h2 className="text-xl font-semibold mb-4">
  //               Location & Availability
  //             </h2>
  //             <label className="block mb-2">Country</label>
  //             <input
  //               className="w-full border rounded p-2"
  //               value={service.country || ""}
  //               onChange={(e) => handleChange("country", e.target.value)}
  //             />
  //             <label className="block mt-4 mb-2">City</label>
  //             <input
  //               className="w-full border rounded p-2"
  //               value={service.city || ""}
  //               onChange={(e) => handleChange("city", e.target.value)}
  //             />
  //             <label className="block mt-4 mb-2">Start Time</label>
  //             <input
  //               className="w-full border rounded p-2"
  //               value={service.availability_start_time || ""}
  //               onChange={(e) =>
  //                 handleChange("availability_start_time", e.target.value)
  //               }
  //             />
  //           </div>
  //         </div>

  //         <div className="mt-6">
  //           <button
  //             onClick={handleSubmit}
  //             disabled={isSubmitting}
  //             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  //           >
  //             {isSubmitting ? "Submitting..." : "Submit Changes"}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
}

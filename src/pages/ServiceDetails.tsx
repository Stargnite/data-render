import { useEffect, useState } from "react"
import type { Service } from "./../lib/types"
import { useParams, useNavigate } from "react-router-dom"

export default function ServiceDetails() {
  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://consultapi.vindove.com/api/v1/services/${id}`)
        const data = await response.json()
        setService(data.data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching service details:", error)
      }
    }

    if (id) {
      fetchServiceDetails()
    }
  }, [id])

  if (isLoading) {
    return <div className="p-5 text-2xl">Loading...</div>
  }

  if (!service) {
    return <div className="p-5 text-2xl">Service not found</div>
  }

  return (
    <div className="p-5">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-white transition-all hover:text-gray-500">
       
        <span>←</span>
        Back to services
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">{service.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Service Information</h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium">Description</td>
                  <td className="py-3">{service.description || "No description"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Service Type</td>
                  <td className="py-3">{service.service_type || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Category ID</td>
                  <td className="py-3">{service.service_category_id || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Website</td>
                  <td className="py-3">{service.website_url || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Experience</td>
                  <td className="py-3">{service.year_of_experience || "0"} years</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Language</td>
                  <td className="py-3">{service.language || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Location & Availability</h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium">Country</td>
                  <td className="py-3">{service.country || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">State</td>
                  <td className="py-3">{service.state || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">City</td>
                  <td className="py-3">{service.city || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Start Time</td>
                  <td className="py-3">{service.availability_start_time || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">End Time</td>
                  <td className="py-3">{service.availability_end_time || "N/A"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Coordinates</td>
                  <td className="py-3">
                    {service.latitude && service.longitude ? `${service.latitude}, ${service.longitude}` : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-3 font-medium">Subscription Type</td>
                <td className="py-3">{service.subscription_type || "N/A"}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 font-medium">Expires At</td>
                <td className="py-3">{service.subscription_expires_at || "N/A"}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 font-medium">Created By</td>
                <td className="py-3">{service.created_by || "N/A"}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 font-medium">Created At</td>
                <td className="py-3">{service.created_at || "N/A"}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 font-medium">Updated At</td>
                <td className="py-3">{service.updated_at || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

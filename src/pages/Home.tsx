// import { useEffect, useState } from 'react'
// import { Service } from './../lib/types'
// import { useNavigate } from 'react-router-dom';

// function Home() {
// 	const [services, setServices] = useState<Service[]>([])
// 	const [isLoading, setIsLoading] = useState(false)

// 	const navigate = useNavigate();


// 	useEffect(() => {
// 		const fetchServices = async () => {
// 			try {
// 				setIsLoading(true)
// 				const response = await fetch('https://consultapi.vindove.com/api/v1/services')
// 				const data = await response.json();
// 				setServices(data.data.data)
// 				setIsLoading(false)
// 				console.log(data.data.data)
// 			} catch (error) {
// 				console.error('Error fetching services:', error);
// 			}
// 		}

// 		fetchServices()
// 	}, [])


// 	return (
// 		<div className='p-5'>
// 			<h1 className='font-bold text-5xl mb-10'>Rendered Data</h1>
// 			{isLoading ? <p className='text-2xl'>Loading...</p> : (<div className="flex flex-col gap-10">
// 				{services.map((service: Service) => (
// 					<div key={service.id} onClick={() => navigate(`/service/${service.id}`)}>
// 						<div className="card bg-gray-950 p-10 rounded-md overflow-hidden hover:bg-gray-900 cursor-pointer transition-all duration-300">
// 							<h2><span className='font-bold'>service name:</span> {service.name}</h2>
// 							<p><span className='font-bold'>Description:</span> {service.description}</p>
// 							<p><span className='font-bold'>service_category_id:</span>{service.service_category_id}</p>
// 							<p><span className='font-bold'>Website:</span>{service.website_url}</p>
// 							<p><span className='font-bold'>country:</span>{service.country}</p>
// 							<p><span className='font-bold'>state:</span>{service.state}</p>
// 							<p><span className='font-bold'>city:</span>{service.city}</p>
// 							<p><span className='font-bold'>years of experience:</span>{service.year_of_experience}</p>
// 							<p><span className='font-bold'>language:</span>{service.language}</p>
// 							<p><span className='font-bold'>start time:</span>{service.availability_start_time}</p>
// 							<p><span className='font-bold'>end time:</span>{service.availability_end_time}</p>
// 							<p><span className='font-bold'>Service type:</span>{service.service_type}</p>
// 							<p><span className='font-bold'>latitude:</span>{service.latitude}</p>
// 							<p><span className='font-bold'>longitude:</span>{service.longitude}</p>
// 							<p><span className='font-bold'>subscription type:</span>{service.subscription_type}</p>
// 							<p><span className='font-bold'>subscription expires at:</span>{service.subscription_expires_at}</p>
// 							<p><span className='font-bold'>created_by:</span>{service.created_by}</p>
// 							<p><span className='font-bold'>created at:</span>{service.created_at}</p>
// 							<p><span className='font-bold'>updated at:</span>{service.updated_at}</p>
// 						</div>

// 					</div>
// 				))}
// 			</div>)}
// 		</div>
// 	)
// }

// export default Home

import { useEffect, useState } from "react"
import type { Service } from "./../lib/types"
import { useNavigate } from "react-router-dom"

export default function ServiceTable() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://consultapi.vindove.com/api/v1/services")
        const data = await response.json()
        setServices(data.data.data)
        setIsLoading(false)
        console.log(data.data.data)
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="p-5 text-black">
      <h1 className="font-bold text-4xl mb-10 text-white">Services</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-2xl text-white">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-white">
                <th className="py-4 px-6 text-left font-semibold">SERVICE NAME</th>
                <th className="py-4 px-6 text-left font-semibold">SERVICE ID</th>
                <th className="py-4 px-6 text-left font-semibold">COUNTRY</th>
                <th className="py-4 px-6 text-left font-semibold">SERVICE TYPE</th>
                <th className="py-4 px-6 text-left font-semibold">EXPERIENCE</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={service.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 cursor-pointer transition-colors`}
                  onClick={() => navigate(`/service/${service.id}`)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        {service.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500">{service.website_url || "No website"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">#{service.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-6 h-6 rounded-full bg-gray-700"></span>
                      {service.country || "Unknown"}
                    </div>
                  </td>
                  <td className="py-4 px-6">{service.service_type || "N/A"}</td>
                  <td className="py-4 px-6">${service.year_of_experience || "0"} years</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import './App.css'
import { Service } from './lib/types'

function App() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://demoapiconsult.thesharepage.com/api/v1/services')
        const data = await response.json();
        setServices(data.data.data)
        console.log(data.data.data)
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }

    fetchServices()
  }, [])


  return (
    <div className='p-5'>
      <h1 className='font-bold text-3xl'>Rendered Data</h1>
      <div className="flex flex-col gap-10">
        {services.map((service: Service) => (
          <div key={service.id} className="card">
            <div>
              <h2><span className='font-bold'>service name:</span> {service.name}</h2>
              <p><span className='font-bold'>Description:</span> {service.description}</p>
              <p><span className='font-bold'>service_category_id:</span>{service.service_category_id}</p>
              <p><span className='font-bold'>Website:</span>{service.website_url}</p>
              <p><span className='font-bold'>country:</span>{service.country}</p>
              <p><span className='font-bold'>state:</span>{service.state}</p>
              <p><span className='font-bold'>city:</span>{service.city}</p>
              <p><span className='font-bold'>years of experience:</span>{service.year_of_experience}</p>
              <p><span className='font-bold'>language:</span>{service.language}</p>
              <p><span className='font-bold'>start time:</span>{service.availability_start_time}</p>
              <p><span className='font-bold'>end time:</span>{service.availability_end_time}</p>
              <p><span className='font-bold'>Service type:</span>{service.service_type}</p>
              <p><span className='font-bold'>latitude:</span>{service.latitude}</p>
              <p><span className='font-bold'>longitude:</span>{service.longitude}</p>
              <p><span className='font-bold'>subscription type:</span>{service.subscription_type}</p>
              <p><span className='font-bold'>subscription expires at:</span>{service.subscription_expires_at}</p>
              <p><span className='font-bold'>created_by:</span>{service.created_by}</p>
              <p><span className='font-bold'>created at:</span>{service.created_at}</p>
              <p><span className='font-bold'>updated at:</span>{service.updated_at}</p>
              <div>
                {/* {service.pricing.map((item) => (
                  <div key={item.id}>
                    <p>Type: {item.pricing_type}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                ))} */}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default App

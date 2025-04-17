// pages/ServiceDetails.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Service } from '../lib/types';

function ServiceDetails() {
  const { id } = useParams();
	const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`https://demoapiconsult.thesharepage.com/api/v1/services/${id}`);
        const data = await response.json();
        setService(data.data); // adjust based on actual API response
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [id]);

  if (!service) return <p>Loading...</p>;

  return (
    <div className='p-5'>
			 <button
        className="mb-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

			
      <h1 className='font-bold text-3xl mb-5'>{service.name}</h1>
      <p><span className='font-bold'>Description:</span> {service.description}</p>
      <p><span className='font-bold'>Website:</span> {service.website_url}</p>
      <p><span className='font-bold'>City:</span> {service.city}</p>
      <p><span className='font-bold'>State:</span> {service.state}</p>
      <p><span className='font-bold'>Country:</span> {service.country}</p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default ServiceDetails;

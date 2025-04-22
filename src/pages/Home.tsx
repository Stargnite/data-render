// import { useEffect, useState } from "react";
// import type { Service } from "./../lib/types";
// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function ServiceTable() {
//   const [services, setServices] = useState<Service[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [pageNumber, setPageNumber] = useState(1);
//   const { isAuthenticated, logout, token } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(
//           `https://consultapi.vindove.com/api/v1/admin/services?page=${pageNumber}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/vnd.api+json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();
//         setServices(data.data.data);
//         setIsLoading(false);
//         console.log("", data.data.data);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchServices();
//   }, [pageNumber]);

//   return (
//     <div className="relative text-black bg-gray-800 w-full">
//       <div className="flex justify-between items-center border border-b-gray-400 mb-5 p-5 px-6 shadow-2xl fixed w-full bg-gray-800">
//         <h1 className="font-bold text-4xl text-white">Services</h1>
//         <div className="flex justify-between items-center text-white gap-x-5">
//           {/* <h1 className="">Services</h1> */}
//           <p onClick={() => navigate("/service-categories")} className="cursor-pointer hover:underline">Categories</p>
//           {isAuthenticated && (
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="text-blue-600 underline "
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//       <h1 className="font-bold text-2xl mb-10 text-white pt-24 px-6">
//         Available Services
//       </h1>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-40">
//           <p className="text-2xl text-white">Loading...</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="border-b text-white">
//                 <th className="py-4 px-6 text-left font-semibold">
//                   SERVICE NAME
//                 </th>
//                 <th className="py-4 px-6 text-left font-semibold">
//                   SERVICE ID
//                 </th>
//                 <th className="py-4 px-6 text-left font-semibold">COUNTRY</th>
//                 <th className="py-4 px-6 text-left font-semibold">
//                   SERVICE TYPE
//                 </th>
//                 <th className="py-4 px-6 text-left font-semibold">
//                   EXPERIENCE
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {services.map((service, index) => (
//                 <tr
//                   key={service.id}
//                   className={`border-b ${
//                     index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   } hover:bg-gray-100 cursor-pointer transition-colors`}
//                   onClick={() => navigate(`/service/${service.id}`)}
//                 >
//                   <td className="py-4 px-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
//                         {service.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-medium">{service.name}</div>
//                         <div className="text-sm text-gray-500">
//                           {service.website_url || "No website"}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4 px-6 text-gray-600">#{service.id}</td>
//                   <td className="py-4 px-6">
//                     <div className="flex items-center gap-2">
//                       <span className="inline-block w-6 h-6 rounded-full bg-gray-700"></span>
//                       {service.country || "Unknown"}
//                     </div>
//                   </td>
//                   <td className="py-4 px-6">{service.service_type || "N/A"}</td>
//                   <td className="py-4 px-6">
//                     ${service.year_of_experience || "0"} years
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="flex justify-center gap-x-5 items-center my-5">
//             <button
//               className="text-lg text-blue-500 cursor-pointer"
//               onClick={() => setPageNumber(1)}
//             >
//               1
//             </button>
//             <button
//               className="text-lg text-blue-500 cursor-pointer"
//               onClick={() => setPageNumber(2)}
//             >
//               2
//             </button>
//             <button
//               className="text-lg text-blue-500 cursor-pointer"
//               onClick={() => setPageNumber(3)}
//             >
//               3
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

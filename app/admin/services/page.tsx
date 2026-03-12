import { GetService } from "@/services/service";
import Link from "next/link";
import FormAddService from "./formAdd";
import DropCustomerButton from "../customer/dropCustomer";
import DropServiceButton from "./dropService";

const ServicesPage = async () => {
   const {data} =  await GetService(); 
   console.log(data);
    return (
       <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Service</h1>
          <p className="mb-3"> Manage your services here.</p>
          <FormAddService label="Tambah Service" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4" />
            <div className="grid grid-cols-5 gap-4 mt-4">
               {data && data.filter((service: any): service is { id?: number; name?: string; min_usage?: number; max_usage?: number; price?: number; } => service !== undefined).map((service: { id?: number; name?: string; min_usage?: number; max_usage?: number; price?: number; })=>(
                  <div key={service.id} className="border p-4 rounded shadow">
                     <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                     <p>Min Usage: {service.min_usage}</p>
                     <p>Max Usage: {service.max_usage}</p>
                     <p>Price: ${service.price}</p>
                     <FormAddService id={service.id} formData={service}
                      label="Edit Service" 
                      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 mt-2 " />
                     {service.id && <DropServiceButton serviceId={service.id} />}

                  </div>
               ))}
            </div>
       </div>
      )
 }
 export default ServicesPage
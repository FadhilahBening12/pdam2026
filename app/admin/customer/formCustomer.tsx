'use client';
import Modal from "@/components/modal";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {useRouter} from "next/navigation"
import { CreateUpdateCustomer } from "@/services/customer";
import { Service } from "@/types/getService";
type PropsFormAdd = {
    id?: number | undefined
    formData?: any
    label:string
    className:string
    serviceList: Service[]|undefined
}
const FormCustomer = ({id,formData, label, className, serviceList}: PropsFormAdd) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState<string>( formData?.user.username || "");    
    const [password, setPassword] = useState<string>(formData?.user.password || "");
    const [customer_number, setCustomerNumber] = useState<string>(formData?.customer_number || "");
    const [name, setName] = useState<string>(formData?.name || "");
    const [phone, setPhone] = useState<string>(formData?.phone || "");
    const [address, setAddress] = useState<string>(formData?.address || "");
        const [service_id, setServiceId] = useState<number>(formData?.service.id || 0);
    const router = useRouter()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const customerData = {
            customer_number,
            name,
            phone,
            address,
            service_id,
            username,
            password
        };
        const response = await CreateUpdateCustomer(id,customerData);
        if(response.status){
            toast(response.message, { hideProgressBar: true, containerId: `customerID`, type: "success", autoClose: 2000 })
            setIsOpen(false);
            setName("");
            setCustomerNumber("");
            setPhone("");
            setAddress("");
            setServiceId(0);
            setUsername("");
            setPassword("");
            router.refresh()
        } else {
            toast(response.message, { hideProgressBar: true, containerId: `customerID`, type: "error", autoClose: 3000 })
                    }
    };
    return (
        <div>
            <button  onClick={() => setIsOpen(true)} className={`${className}`}>
                {label}
            </button>
            <ToastContainer  containerId={"customerID"}/>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Tambah Customer">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Customer
                        </label>
                        <input value={name} onChange={e=>setName(e.target.value)} type="text" className="mt-1 block w-full text-black border border-black rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Customer Number
                        </label>
                        <input value={customer_number} onChange={e=>setCustomerNumber(e.target.value)} type="text" className="mt-1 block w-full text-black border border-black rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input value={phone} onChange={e=>setPhone(e.target.value)} type="text" className="mt-1 block w-full text-black border border-black rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input value={address} onChange={e=>setAddress(e.target.value)} type="text" className="mt-1 block w-full text-black border border-black rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Service Name
                        </label>
                        <select name="service_id" id="service_id" value={service_id} onChange={e=>setServiceId(Number(e.target.value))} className="mt-1 block w-full text-black border border-black rounded-md p-2">
                            <option value="">Pilih Service</option>
                            {serviceList?.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input value={username} onChange={e=>setUsername(e.target.value)} type="text" className="mt-1 block w-full text-black border border-black rounded-md p-2" />    
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="mt-1 block w-full text-black border border-black rounded-md p-2" />    
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
export default FormCustomer;

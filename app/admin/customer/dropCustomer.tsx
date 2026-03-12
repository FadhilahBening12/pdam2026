'use client'
import { useRouter } from 'next/navigation';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { DropCustomer } from '@/services/customer';


const DropCustomerButton = ({customerId}: {customerId: number}) => {
    const router = useRouter()
    const handleDelete = async () => {
        confirmAlert({
            title: 'Confirm to delete', 
            message: 'Are you sure to delete this customer?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await DropCustomer(customerId);
                        router.refresh()
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }
    return (
        <div>
            <button onClick={() => handleDelete()} className="bg-red-500 text-white cursor-pointer hover:bg-red-700 px-2 py-1 rounded">
                Drop
            </button>
        </div>
    );
}
export default DropCustomerButton

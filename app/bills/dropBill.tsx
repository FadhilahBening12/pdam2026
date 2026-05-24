'use client'
import { useRouter } from 'next/navigation';
import { DropBill } from '@/services/bill';


const DropBillButton = ({billId}: {billId: number}) => {
    const router = useRouter()
    const handleDelete = async () => {
        if(confirm("Are you sure to delete this bill?")){
            await DropBill(billId);
            router.refresh()
        }
    }
    return (
        <div>
            <button onClick={() => handleDelete()} className="bg-red-500 text-white cursor-pointer hover:bg-red-700 px-2 py-1 rounded">
                Drop
            </button>
        </div>
    );
}
export default DropBillButton

'use client';

import Modal from "@/components/modal";
import { AddService } from "@/services/service";
import { useState } from "react";
import { toast } from "react-toastify";

type PropsFormAdd = {
    id?: number;
    formData?: {
        id?: number;
        name?: string;
        min_usage?: number;
        max_usage?: number;
        price?: number;
    };
    label: string;
    className: string;
};

const FormAddService = ({ id: propId, formData, label, className }: PropsFormAdd) => {
    const [isOpen, setIsOpen] = useState(false);

    const [id, setId] = useState<number | undefined>(propId ?? formData?.id);
    const [name, setName] = useState<string>(formData?.name || "");
    const [minUsage, setMinUsage] = useState<number>(formData?.min_usage || 0);
    const [maxUsage, setMaxUsage] = useState<number>(formData?.max_usage || 0);
    const [price, setPrice] = useState<number>(formData?.price || 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const serviceData = {
            name,
            min_usage: minUsage,
            max_usage: maxUsage,
            price
        };

        const response = await AddService(id, serviceData);

        if (response.status) {
            toast.success(response.message, {
                hideProgressBar: true,
                autoClose: 2000
            });

            setIsOpen(false);

            if (!id) {
                setName("");
                setMinUsage(0);
                setMaxUsage(0);
                setPrice(0);
            }
        } else {
            toast.error(response.message, {
                hideProgressBar: true,
                autoClose: 3000
            });
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className={className}
            >
                {label}
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={id ? "Edit Service" : "Tambah Service"}
            >
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Service
                        </label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            required
                            className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Min Usage
                        </label>
                        <input
                            value={minUsage}
                            onChange={e => setMinUsage(Number(e.target.value))}
                            type="number"
                            required
                            className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Max Usage
                        </label>
                        <input
                            value={maxUsage}
                            onChange={e => setMaxUsage(Number(e.target.value))}
                            type="number"
                            required
                            className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            type="number"
                            required
                            className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            {id ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default FormAddService;
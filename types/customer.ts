import { User } from "./getMe";
import { Service } from "./getService";

export interface Customer {
    id: number;
    user_id: number;
    customer_number: string;
    name: string;
    phone: string;
    address: string;
    service_id: number;
    owner_token: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    service: Service;
}

import { axiosInstance } from "../config/axios";

export async function storePurchase( status, products ) {
    try {
        const { data } = await axiosInstance.post("/api/purchases", {
            "status_purchase": status,
            products
        });
        
        return data.message;
    } catch (error) {
        console.log( error );
    }
};

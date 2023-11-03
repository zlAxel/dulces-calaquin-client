import { axiosInstance } from "../config/axios";

export async function getProducts() {
    try {
        const { data } = await axiosInstance.get("/api/products");
        
        return data.data;
    } catch (error) {
        console.log( error );
    }
};

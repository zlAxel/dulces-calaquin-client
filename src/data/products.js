import { axiosInstance } from "../config/axios";

// ? Función para obtener todos los productos
export async function getProducts() {
    try {
        const { data } = await axiosInstance.get("/api/products");
        
        return data.data;
    } catch (error) {
        throw error;
    }
};

// ? Función para obtener los productos más vendidos
export async function getTopProducts() {
    try {
        const { data } = await axiosInstance.get("/api/top-products/");

        return data.products;
    } catch (error) {
        throw error;
    }
}

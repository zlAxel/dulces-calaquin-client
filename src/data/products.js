import { axiosInstance } from "../config/axios";

// ? Función para obtener todos los productos disponibles
export async function getProducts() {
    try {
        const { data } = await axiosInstance.get("/api/products");
        
        return data.data;
    } catch (error) {
        throw error;
    }
};

// ? Función para obtener todos los productos
export async function getAllProducts() {
    try {
        const { data } = await axiosInstance.get("/api/all-products");
        
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

// ? Función para alterar el available de un producto
export async function updateProductAvailable(id, available) {
    try {
        const { data } = await axiosInstance.post(`/api/product-available/${id}`, { available });

        return data.message;
    } catch (error) {
        throw error;
    }
};

// ? Función para guardar un producto
export async function saveProduct(productData) {
    try {
        const { data } = await axiosInstance.post("/api/products", productData);

        return data.message;
    } catch (error) {
        throw error;
    }
};

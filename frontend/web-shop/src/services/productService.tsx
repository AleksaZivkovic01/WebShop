import api from "./api";

export const getProducts = async () => {
    const response = await api.get("/product");
    return response.data;
}

export const getProductById = async (id: string | number) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
}

export const getCategories = async () => {
    const response = await api.get("/category");
    return response.data;
}

export const createCategory = async (name: string) => {
    const response = await api.post("/category", { name });
    return response.data;
}

export const updateCategory = async (id: number, name: string) => {
    const response = await api.put(`/category/${id}`, { name });
    return response.data;
}

export const deleteCategory = async (id: number) => {
    const response = await api.delete(`/category/${id}`);
    return response.data;
}

export const makeOrder = async (orderData: {
    items: {
        productId: number;
        quantity: number;
    }[];
}) => {
    const response = await api.post("/order", orderData);
    return response.data;
}

export const createProduct = async (productData: {
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    categoryId: number;
}) => {
    const response = await api.post("/product", productData);
    return response.data;
}

export const updateProduct = async (id: number, productData: {
    name?: string;
    imageUrl?: string;
    price?: number;
    quantity?: number;
    categoryId?: number;
}) => {
    const response = await api.put(`/product/${id}`, productData);
    return response.data;
}

export const deleteProduct = async (id: number) => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
}


import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com",
});

const api2 = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPost2 = () => {
    return api2.get("/posts");
}

export const PostData2 = (data: any) => {
    return api2.post("/posts", data);
}

// get all method ()
export const getPost = () => {
    return api.get("/products");
}

// post method (create)
export const PostData = (data: any) => {
    return api.post("/products", data);
}

// delete method (delete)
export const deletePost = (id: any) => {
    return api.delete(`/products/${id}`);
}

// put method (update)
export const putPost = (id: any, data: any) => {
    return api.put(`/products/${id}`, data);
}





import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com",
});

// get all method ()
export const getPost = () => {
    return api.get("/products");
}

// post method (create)
export const PostData = (data: any) => {
    return api.post("/products", data);
}
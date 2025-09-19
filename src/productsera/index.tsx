import { useEffect, useState } from "react";
import { getPost, deletePost, putPost, PostData2 } from "../api/api";
import { Button } from "../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../components/ui/dialog";

export const ProductsEra = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editId, setEditId] = useState<any>("");
    const [editTitle, setEditTitle] = useState<string>("");
    const [editPrice, setEditPrice] = useState<any>("");
    const [editImage, setEditImage] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setEditImage(URL.createObjectURL(file)); // preview ke liye
        }
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res: any = await getPost();
            setData(Array.isArray(res?.data) ? res.data : []);
        } catch (err) {
            setError("Failed to load products");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: any) => {
        try {
            const res: any = await deletePost(id);
            setData(data.filter((item: any) => item.id !== id));
        } catch (err) {
            setError("Failed to delete product");
        }
    };

    const handleUpdate = async (id: any) => {
        try {
            const payload = {
                id: editId,
                title: editTitle,
                price: editPrice,
                image: editImage,
            };
            const res: any = await putPost(id, payload);
            setData(data.map((item: any) => (item.id === id ? res.data : item)));
        } catch (err) {
            setError("Failed to update product");
        }
    };

    const handleAdd = async () => {
        try {
            const payload = {
                id: editId,
                title: editTitle,
                price: editPrice,
                image: editImage,
            };
            const res: any = await PostData2(payload);
            setData([...data, res.data]);
        } catch (err) {
            setError("Failed to add product");
        }
    };

    // 🔹 async ka kaam
    // 1: Jab aap kisi function ke saath async likhte ho, to woh function hamesha ek Promise return karta hai, 
    // chahe aap uske andar normal value return karo.
    // 2: Matlab agar aap async function likh rahe ho to aap uske andar await use kar sakte ho.

    // 🔹 await ka kaam
    // 1: await ka matlab hai: ruk jao jab tak Promise resolve na ho jaye.
    // 2: Yeh sirf async function ke andar hi use hota hai.
    // 3: Jab tak Promise ka result nahi aata, tab tak woh line rukti hai, lekin baaki program freeze nahi hota
    // (background mein chal raha hota hai).

    // ✅ Simple samajh lo
    // async: Function ko asynchronous banata hai aur promise return karwata hai.
    // await: Promise ke result ka wait karta hai bina program ko block kiye.  

    // 🔹 Promise kya hai?
    // Promise ek JavaScript object hai jo future mein aapko value dega.
    // Wo value ya to:
    // Resolve (succes) hogi → kaam sahi hua
    // Reject (failure) hoga → error aaya
    // Matlab ke:
    // "Promise ek wada hai ke ya to data milega ya error."

    // 🔹 try...catch kya hota hai?
    // JavaScript mein try...catch error handling ke liye use hota hai.
    // try block → isme aap wo code likhte ho jisme error aane ka chance hai.
    // catch block → agar try block mein error aata hai to yahan ka code chal jaata hai.
    //👉 Matlab ke:
    // "try mein koshish karo, agar ghalti ho jaaye to catch se sambhal lo."

    useEffect(() => {
        fetchProducts();
    }, []);

    if (isLoading) {
        return <div>Loading products…</div>;
    }

    return (
        <>
            <div>
                <Dialog>
                    <DialogTrigger>
                        <Button>Add Product</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <h1 className="text-zinc-900 text-3xl font-semibold">Add Product</h1>
                        <p className="text-zinc-900 text-sm">Are you sure you want to add this product?</p>
                        <div>
                            <div>
                                <label>Image</label>
                                <label htmlFor="image" className="rounded w-full outline-none">
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    {editImage && (
                                        <img src={editImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
                                    )}
                                </label>
                            </div>
                            <div>
                                <label>Id</label>
                                <input value={editId} onChange={(e) => setEditId(e.target.value)} className="border border-zinc-900 px-2 py-1 rounded w-full outline-none" />
                            </div>
                            <div>
                                <label>Title</label>
                                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="border border-zinc-900 px-2 py-1 rounded w-full outline-none" />
                            </div>
                            <div>
                                <label>Price</label>
                                <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="border border-zinc-900 px-2 py-1 rounded w-full outline-none" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-x-2 mt-4">
                            <DialogClose>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose>
                                <Button variant="destructive" onClick={handleAdd}>Add</Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {error && (
                    <div className="col-span-full text-red-600 flex items-center gap-2">
                        <span>{error}</span>
                        <button onClick={fetchProducts} className="ml-2 px-3 py-1 rounded bg-sky-900 text-white hover:bg-sky-800">Retry</button>
                        <button className="ml-2 px-3 py-1 rounded bg-zinc-900 text-white hover:bg-zinc-800">Use sample data</button>
                    </div>
                )}

                {!error && data.length === 0 && (
                    <div className="col-span-full text-zinc-600">
                        No products found.
                        <button className="ml-2 px-3 py-1 rounded bg-zinc-900 text-white hover:bg-zinc-800">Use sample data</button>
                    </div>
                )}

                {data.map((item: any, index: number) => (
                    <div key={item.id ?? index} className="border border-zinc-950 rounded-md p-4 flex flex-col items-center gap-2">
                        <div className="w-28 h-28 rounded-full border border-zinc-700 p-1">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover shrink-0 rounded-full" />
                        </div>
                        <span className="text-sm text-zinc-500 p-3 py-2 bg-zinc-950 rounded-md">{index + 1}</span>
                        <h2 className="text-xl max-w-40 text-ellipsis overflow-hidden whitespace-nowrap m-0 text-red-600 font-bold">{item.title}</h2>
                        <span className="text-zinc-800">${item.price}</span>
                        <div className="flex gap-x-2 w-full">
                            <div className="w-1/2">
                                <Dialog>
                                    <DialogTrigger className="w-full">
                                        <Button
                                            className="!w-full"
                                            onClick={() => {
                                                setEditId(item.id);
                                                setEditTitle(item.title ?? "");
                                                setEditPrice(item.price ?? "");
                                                setEditImage(item.image ?? "");
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <h1 className="text-zinc-900 text-3xl font-semibold">Edit Product</h1>
                                        <p className="text-zinc-900 text-sm">Are you sure you want to edit this product?</p>

                                        <div className="space-y-3">
                                            {/* Image Upload */}
                                            <div>
                                                <label className="text-zinc-900 text-sm">Image</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="mt-1 block w-full text-sm text-gray-700
                         file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0
                         file:text-sm file:font-semibold
                         file:bg-zinc-900 file:text-white
                         hover:file:bg-zinc-700"
                                                />
                                                {editImage && (
                                                    <img src={editImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
                                                )}
                                            </div>

                                            <div>
                                                <label className="text-zinc-900 text-sm">Id</label>
                                                <input value={editId} onChange={(e) => setEditId(e.target.value)} className="border border-zinc-900 px-2 py-1 rounded w-full outline-none" />
                                            </div>

                                            <div>
                                                <label className="text-zinc-900 text-sm">Title</label>
                                                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="border border-zinc-900 px-2 py-1 rounded w-full outline-none" />
                                            </div>

                                            <div>
                                                <label className="text-zinc-900 text-sm">Price</label>
                                                <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="border border-zinc-900 px-2 py-1 rounded w-full outline-none" />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-x-2 mt-4">
                                            <DialogClose>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <DialogClose>
                                                <Button onClick={() => handleUpdate(item.id)} variant="destructive">Update</Button>
                                            </DialogClose>
                                        </div>
                                    </DialogContent>

                                </Dialog>
                            </div>
                            <div className="w-1/2">
                                <Dialog>
                                    <DialogTrigger className="w-full">
                                        <Button className="w-full">Delete</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <h1 className="text-zinc-900 text-3xl font-semibold">Delete Product</h1>
                                        <p className="text-zinc-900 text-sm">Are you sure you want to delete this product?</p>
                                        <div className="flex justify-end gap-x-2">
                                            <Button variant="outline">Cancel</Button>
                                            <Button variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
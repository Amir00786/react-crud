import { use, useEffect, useState } from "react";
import { getPost } from "../api/api";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

export const ProductsEra = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
// Resolve (success) hogi → kaam sahi hua
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

const useSampleData = () => {
    setData([
        {
            id: 1,
            title: "Sample Backpack",
            price: 39.99,
            image: "https://via.placeholder.com/160x160.png?text=Backpack",
        },
        {
            id: 2,
            title: "Sample Headphones",
            price: 59.99,
            image: "https://via.placeholder.com/160x160.png?text=Headphones",
        },
        {
            id: 3,
            title: "Sample Sneakers",
            price: 79.99,
            image: "https://via.placeholder.com/160x160.png?text=Sneakers",
        },
    ]);
};

if (isLoading) {
    return <div>Loading products…</div>;
}

return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {error && (
            <div className="col-span-full text-red-600 flex items-center gap-2">
                <span>{error}</span>
                <button onClick={fetchProducts} className="ml-2 px-3 py-1 rounded bg-sky-900 text-white hover:bg-sky-800">Retry</button>
                <button onClick={useSampleData} className="ml-2 px-3 py-1 rounded bg-zinc-900 text-white hover:bg-zinc-800">Use sample data</button>
            </div>
        )}

        {!error && data.length === 0 && (
            <div className="col-span-full text-zinc-600">
                No products found.
                <button onClick={useSampleData} className="ml-2 px-3 py-1 rounded bg-zinc-900 text-white hover:bg-zinc-800">Use sample data</button>
            </div>
        )}

        {data.map((item: any, index: number) => (
            <div key={item.id ?? index} className="border border-zinc-950 rounded-md p-4 flex flex-col items-center gap-2">
                <div className="w-40 h-40">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm text-zinc-500 p-3 py-2 bg-zinc-950 rounded-md">{index + 1}</span>
                <h2 className="text-xl max-w-40 text-ellipsis overflow-hidden whitespace-nowrap m-0 text-red-600 font-bold">{item.title}</h2>
                <span className="text-zinc-800">${item.price}</span>
                <div className="flex gap-x-2 w-full">
                    <div className="w-1/2">
                        <Dialog>
                            <DialogTrigger className="w-full">
                                <Button className="!w-full">Edit</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <h1>Edit Product</h1>
                                <input className="border " />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="w-1/2">
                        <Dialog>
                            <DialogTrigger className="w-full">
                                <Button className="w-full">Delete</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <h1>Edit Product</h1>
                                <input className="border " />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
};
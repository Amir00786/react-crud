// import { useEffect, useState } from "react";
// import { deletePost, getPost, putPost } from "../api/api";

// const ProductPage = () => {
//     const [data, setData] = useState<any[]>([]);

//     useEffect(() => {
//         getPost().then((res: any) => {
//             setData(res.data);
//         });
//     }, []);

//     const handleDelete = (id: number) => {
//         deletePost(id).then(() => {
//             // UI se remove karna
//             setData((prev) => prev.filter((item) => item.id !== id));
//         });
//     };

//     const handleEdit = (id: number, data: any) => {
//         putPost(id, data).then(() => {
//             // UI se update karna
//             setData((prev) => prev.map((item) => item.id === id ? data : item));
//         });
//     };

//     return (
//         <div className="grid grid-cols-3 gap-4">
//             {data.map((item: any, index: number) => (
//                 <div key={item.id}>
//                     <div className="flex flex-col items-center gap-2 border border-zinc-950 rounded-md p-4">
//                         <div className="w-40 h-40">
//                             <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
//                         </div>
//                         <span className="text-sm text-zinc-500 p-3 py-2 bg-zinc-950 rounded-md">{index + 1}</span>
//                         <h1 className="text-xl max-w-40 text-ellipsis overflow-hidden whitespace-nowrap m-0 text-red-600 font-bold">{item.title}</h1>
//                         <div className="w-full flex justify-between items-center gap-4">
//                             <button onClick={() => handleEdit(item.id, item)} className="bg-sky-900 w-1/2 text-white px-4 py-2 rounded-md hover:bg-sky-800">
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(item.id)}
//                                 className="bg-red-900 w-1/2 text-white px-4 py-2 rounded-md hover:bg-red-800"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default ProductPage;

import { useEffect, useState } from "react";
import { deletePost, getPost, putPost } from "../api/api";

const ProductPage = () => {
    const [data, setData] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState<string>("");
    const [editImage, setEditImage] = useState<string>("");
    const [editPrice, setEditPrice] = useState<string>("");

    useEffect(() => {
        getPost().then((res: any) => {
            setData(res.data);
        });
    }, []);

    const handleDelete = (id: number) => {
        deletePost(id).then(() => {
            setData((prev) => prev.filter((item) => item.id !== id));
        });
    };

    const handleEditClick = (item: any) => {
        setEditingId(item.id);
        setEditTitle(item.title);
        setEditImage(item.image);
        setEditPrice(item.price);
    };

    const handleUpdate = (id: number) => {
        const updatedData = { ...data.find((item) => item.id === id), title: editTitle, image: editImage, price: editPrice };

        putPost(id, updatedData).then(() => {
            setData((prev) =>
                prev.map((item) => (item.id === id ? updatedData : item))
            );
            setEditingId(null); // edit mode off
        });
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            {data.map((item: any, index: number) => (
                <div key={item.id}>
                    <div className="flex flex-col items-center gap-2 border border-zinc-950 rounded-md p-4">
                        <div className="w-40 h-40">
                            <img src={editingId === item.id ? editImage : item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        {
                            <span className="text-sm text-zinc-500 p-3 py-2 bg-zinc-950 rounded-md">{index + 1}</span>
                        }
                        {/* Agar edit mode mein ho to input dikhaye, warna title */}
                        {
                            editingId === item.id ? (
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded w-full"
                                />
                            ) : (
                                <h1 className="text-xl max-w-40 text-ellipsis overflow-hidden whitespace-nowrap m-0 text-red-600 font-bold">
                                    {item.price}
                                </h1>
                            )
                        }
                        {editingId === item.id ? (
                            <input
                                type="text"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="border border-gray-400 px-2 py-1 rounded w-full"
                            />
                        ) : (
                            <h1 className="text-xl max-w-40 text-ellipsis overflow-hidden whitespace-nowrap m-0 text-red-600 font-bold">
                                {item.title}
                            </h1>
                        )}

                        <div className="w-full flex justify-between items-center gap-4">
                            {editingId === item.id ? (
                                <button
                                    onClick={() => handleUpdate(item.id)}
                                    className="bg-green-700 w-1/2 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEditClick(item)}
                                    className="bg-sky-900 w-1/2 text-white px-4 py-2 rounded-md hover:bg-sky-800"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-900 w-1/2 text-white px-4 py-2 rounded-md hover:bg-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductPage;

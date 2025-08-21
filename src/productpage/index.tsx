import { useEffect, useState } from "react";
import { getPost } from "../api/api";

const ProductPage = () => {
    const [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {
        getPost().then((res: any) => {
            setData(res.data);
        });
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            {data.map((item: any) => (
                <div key={item.id}>
                    <div className="flex flex-col gap-2">
                        <div className="w-40 h-40">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-2xl m-0 text-red-600 font-bold">{item.title}</h1>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductPage
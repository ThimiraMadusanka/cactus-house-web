"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProductCardProps = {
  imageUrl: string;
  productName: string;
  productPrice: string;
  id: number;
};

const ProductCard = ({ imageUrl, productName, productPrice, id }: ProductCardProps) => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, [])

    return (
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <div onClick={() => router.push(`/our-plants/${id}`)} className="cursor-pointer">
                {/* Product Image */}
                <Image 
                    src={imageUrl}
                    alt={productName} 
                    className="h-80 w-72 object-cover rounded-t-xl" 
                    width={500}
                    height={500}
                />
                <div className="px-4 py-3 w-72">
                    {/* Product Name */}
                    <p className="text-lg font-bold text-gray-700 truncate block capitalize text-center">{productName}</p>
                    {/* Product Price */}
                    <p className="text-lg font-semibold text-lime-700 cursor-auto my-3 text-center">{productPrice}</p>
                </div>
            </div>
            <div className="w-full pt-0 p-3">
                {token !== null ? (
                    <button 
                        type="button"
                        onClick={() => router.push(`/our-plants/${id}`)}
                        className="bg-lime-800 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded text-sm w-full cursor-pointer"
                    >
                        Add to Cart
                    </button>
                ) : (
                    <button 
                        type="button"
                        onClick={() => router.push('/sign-in')}
                        className="bg-lime-800 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded text-sm w-full cursor-pointer"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProductCard
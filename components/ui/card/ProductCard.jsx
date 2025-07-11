import Image from "next/image"

const ProductCard = ({ imageUrl, productName, productPrice}) => {
  return (
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
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
            </a>
        </div>
    )
}

export default ProductCard
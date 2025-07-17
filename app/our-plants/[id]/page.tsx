"use client"
import React, { useEffect, useState } from 'react'
import LandingLayout from '@/components/layout/LandingLayout'
import { Banner } from '@/components/shared'
import { getProductById } from '@/services/product.service'
import { ProductData } from '@/types/product.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DotLoader } from 'react-spinners'

const ViewProuducts = ({ params }: { params: Promise<{ id: string }> }) => {
  const [data, setData] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [quantity, setQuantity] = useState(1);

  const { id } = React.use(params);
  const router = useRouter();

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(0, prev - 1));

  const fetchData = async(id: number) => {
    try {
      setIsLoading(true);
      const response = await getProductById(id);
      if (response.status === 200) {
        setData(response.data);
        setQuantity(response.data.quantity);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log("Err: ", error);
      router.push('/our-plants')
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(id) {
      fetchData(Number(id))
    } else {
      router.push('/our-plants')
    }
  }, [])

  return (
    <LandingLayout>
      {/* Banner Section */}
      <Banner 
        topBanner
        bannerTitle={data !== null ? data.name : ""}
        bannerSubTitle={data !== null ? "Perfect Gift for Any Space – Shop Cactus Deals Today!" : ""}
      />
      <section className="pt-14 pb-20 mx-auto max-w-7xl justify-items-center justify-center">
        {isLoading && (
          <div className="py-20">
            <DotLoader />
          </div>
        )}

        {data !== null && (
          <div className="flex w-full px-10 gap-5">
            <Image
              src={data.image_url}
              alt="product"
              className="object-cover rounded-xl" 
              width={250}
              height={250}
            />
          <div>
            <p className="text-justify leading-9">{data.description}</p>
            <p className="text-gray-400 text-sm leading-9">{data.tags.map((item: string) => { return `#${item} ` })}</p>
            <p className="text-4xl text-lime-800 py-3">Rs. {data.price}</p>
            <div className="flex justify-between mt-2">
              <div className="flex items-center gap-2">
                <p className="text-gray-500">Quantity:</p>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:text-black"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 w-10 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:text-black"
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                type="button"
                className="bg-lime-800 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        )}
      </section>
    </LandingLayout>
  )
}

export default ViewProuducts
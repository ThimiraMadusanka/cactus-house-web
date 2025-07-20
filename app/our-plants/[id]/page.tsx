"use client"
import React, { useEffect, useState } from 'react'
import LandingLayout from '@/components/layout/LandingLayout'
import { Banner } from '@/components/shared'
import { getProductById } from '@/services/product.service'
import { ProductData } from '@/types/product.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DotLoader } from 'react-spinners'
import { addToCart } from '@/services/cart.service'
import { toast } from 'react-toastify'

const ViewProuducts = ({ params }: { params: Promise<{ id: string }> }) => {
  const [data, setData] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>(0);

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
    // get token
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      const user = JSON.parse(storedUser);
      setToken(storedToken);
      setUserId(user.id);
    }

    // check id existence
    if(id) {
      fetchData(Number(id))
    } else {
      router.push('/our-plants')
    }
  }, [])

  const addItemsOnCart = async () => {
    try {
      if(token && userId) {
        const data = {
          user_rid: userId,
          product_rid: Number(id),
          amount: quantity.toString(),
        }
        const response = await addToCart(token, data);
        if (response.status === 201) {
          // success toast for remove item success
          toast.success("Item successfully add to cart.");
          router.push('/our-plants');
        } else {
          // error toast for error while remove item
          toast.error("Something went wrong. Please check and try again.")
        }
      } else {
        //No user found
        toast.error("User not found");
      }
    } catch (error: any) {
      // error toast for error
      toast.error(`${error.response.data ? error.response.data : "Something went wrong. Please check and try again."}`)
    }
  }

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
              {token !== null ? (
                <button 
                  type="button"
                  onClick={() => addItemsOnCart()}
                  className="bg-lime-800 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded text-sm cursor-pointer"
                >
                  Add to Cart
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => router.push('/sign-in')}
                  className="bg-lime-800 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded text-sm cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
        )}
      </section>
    </LandingLayout>
  )
}

export default ViewProuducts
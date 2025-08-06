"use client"
import { useEffect, useState } from "react";
import LandingLayout from "@/components/layout/LandingLayout";
import { Banner } from "@/components/shared";
import { ProductCard } from "@/components/ui/card";
import { getProducts } from "@/services/product.service";
import { ProductData } from "@/types/product.types";
import Pagination from "@/components/ui/pagination/Pagination";
import { DotLoader } from "react-spinners";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdHourglassEmpty } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

const OurPlants = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const pageSize = 10;

  // fetch data
  const fetchProductss = async (currentPage: number, text: string) => {
    try {
      setIsLoading(true);
      const response = await getProducts(currentPage, pageSize, "ACTIVE", text);
      if (response.status === 200) {
        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.total_count / pageSize));
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.log("Err", error);
    } finally {
      setIsLoading(false);
    }
  }

  // call fetch data function
  useEffect(() => {
    fetchProductss(currentPage, searchText);
  }, [currentPage, searchText]);

  return (
    <LandingLayout>
      {/* Banner Section */}
      <Banner 
        topBanner
        bannerTitle="Plants"
        bannerSubTitle="Choose your favorite Cactus plant in our store."
      />
      <section className="pt-14 pb-20 mx-auto max-w-7xl justify-items-center justify-center">
        <div className="flex justify-center w-full pt-0 p-10 gap-2">
          <div className="border border-gray-300 rounded-lg py-2 px-3 w-2/4 mr-2 flex gap-2 items-center">
            <BiSearch />
              <input
              type="text"
              name="message_content"
              id="message_content"
              className="w-full text-md"
              placeholder="Search cactus plants..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {isLoading && (
          <div className="py-20">
            <DotLoader />
          </div>
        )}

        {isError && (
          <div className="max-w-md w-full text-center py-10">
            <div className="flex justify-center mb-8">
              <FaExclamationTriangle size={50} className="text-lime-950" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-lime-800">Oops!</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Something wnet wrong!
            </p>
          </div>
        )}

        {!isLoading && !isError && data.length === 0 ? (
          <div className="max-w-md w-full text-center py-10">
            <div className="flex justify-center mb-8">
              <MdHourglassEmpty size={50} className="text-lime-950" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-lime-800">Please Wait!</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Products will to be add shortly. Check back soon!
            </p>
          </div>
        ) : (
          <div className="w-fit grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-10 gap-x-10">
            {data.map((item: ProductData, i: number) => {
              return (
                <ProductCard
                  key={i}
                  id={item.id}
                  imageUrl={item.image_url}
                  productName={item.name}
                  productPrice={`Rs. ${item.price}`}
                />
              )
            })}
          </div>
        )}

        <div className="flex justify-center pt-10">
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </LandingLayout>
  )
}

export default OurPlants
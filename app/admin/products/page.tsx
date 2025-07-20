"use client"
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination/Pagination"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteProduct, getProducts, productStatusChange } from "@/services/product.service";
import { ProductData } from "@/types/product.types";
import Image from "next/image";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Swal from "sweetalert2";
import ProductAddModal from "@/components/modal/ProductAddModal";
import ProductUpdateModal from "@/components/modal/ProductUpdateModal";
import ProductViewDetailsModal from "@/components/modal/ProductViewDetailsModal";

const Products = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [token, setToken] = useState<string>("");
  const [isAddUpdateOrDelete, setIsAddUpdateOrDelete] = useState<boolean>(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [openAddProductModal, setOpenAddProductModal] = useState<boolean>(false);
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState<boolean>(false);
  const [openViewDetailsModal, setOpenViewDetailsModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const pageSize = 10;
  const router = useRouter();

  // fetch data
  const fetcProducts = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await getProducts(currentPage, pageSize);
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
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetcProducts(currentPage);
      setIsError(false);
      setData([]);
      setToken(storedToken);
    } else {
      router.push('/');
      toast.error("Someting went wrong!");
    }
  }, [currentPage, isAddUpdateOrDelete]);

  // handle status change
  const handleStatusChange = (id: number, name: string, status: string) => {
    setOpenDropdownIndex(null);
    Swal.fire({
      title: "Warning..!",
      text: `Are you sure you want to ${status === "ACTIVE" ? "deactivate" : "activate"} ${name}?`,
      icon: "warning",
      confirmButtonText: `${status === "ACTIVE" ? "Deactivate" : "Activate"} Now`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        statusChange(id, status === "ACTIVE" ? "DEACTIVE" : "ACTIVE");
      }
    });
  }

  // status change function
  const statusChange = async (id: number, status: string) => {
    try {
      const response = await productStatusChange(token, id, status);

      if (response.status === 200) {
        // success popup for status change product success
        Swal.fire({
          title: "Success..!",
          text: "Status changed successfully!",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
          },
          buttonsStyling: false,
        });
        setIsAddUpdateOrDelete(!isAddUpdateOrDelete);
      } else {
        // error popup for error while status change
        Swal.fire({
          title: "Ooops..!",
          text: "Something went wrong. Please check and try again.",
          icon: "error",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "p-1 px-2 bg-red-600 rounded text-white",
          },
          buttonsStyling: false,
        });
      }
    } catch (error: any) {
      // error popup for error
      Swal.fire({
        title: "Ooops..!",
        text: `${
          error.response.statusText
            ? error.response.statusText
            : "Something went wrong. Please check and try again."
        }`,
        icon: "error",
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: "p-1 px-2 bg-red-600 rounded text-white",
        },
        buttonsStyling: false,
      });
    }
  };

  // remove product
  const handleRemove = (id: number, name: string) => {
    setOpenDropdownIndex(null);
    Swal.fire({
      title: "Warning..!",
      text: `Are you sure you want to remove ${name}?`,
      icon: "warning",
      confirmButtonText: "Rmove Now",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(id);
      }
    });
  };

  // remove product function
  const removeProduct = async (id: number) => {
    try {
      const response = await deleteProduct(token, id);

      if (response.status === 204) {
        // success popup for remove product success
        Swal.fire({
          title: "Success..!",
          text: "Product removed successfully!",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
          },
          buttonsStyling: false,
        });
        setIsAddUpdateOrDelete(!isAddUpdateOrDelete);
      } else {
        // error popup for error while remove product
        Swal.fire({
          title: "Ooops..!",
          text: "Something went wrong. Please check and try again.",
          icon: "error",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "p-1 px-2 bg-red-600 rounded text-white",
          },
          buttonsStyling: false,
        });
      }
    } catch (error: any) {
      // error popup for error
      Swal.fire({
        title: "Ooops..!",
        text: `${
          error.response.data
            ? error.response.data
            : "Something went wrong. Please check and try again."
        }`,
        icon: "error",
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: "p-1 px-2 bg-red-600 rounded text-white",
        },
        buttonsStyling: false,
      });
    }
  };

  // status color handle method
  const handleStatusTextColor = (status: string) => {
    if (status === "ACTIVE") {
      return "text-green-500";
    } else if (status === "DEACTIVE") {
      return "text-red-500";
    } else {
      return "text-gray-500";
    }
  }

  return (
   <div className="bg-white rounded-md">
      <div className="p-5">
        <div className="flex justify-between items-center pb-3 border-b border-gray-500">
          <h1 className="font-extrabold page_title">Products</h1>
          <button 
            type="button" 
            className="border rounded-md text-white bg-lime-800 hover:bg-lime-600 py-1.5 px-5 text-sm"
            onClick={() => setOpenAddProductModal(!openAddProductModal)}
          >
            Add Product
          </button>
        </div>
        <div className="pt-5">
          <div className="overflow-hidden ">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Index </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Name </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Price </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Quantity </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Status </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Actions </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 ">
                {/* For loading data */}
                {isLoading && (
                  <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                    <td colSpan={6} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* For Error */}
                {isError && (
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={6} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Something went wrong!</span>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && !isError && data.length === 0 ? (
                // Inform when there is no data
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={6} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <h5 className="fw-bold mb-0">No products found.</h5>
                  </td>
                </tr>
              ) : (
                data.map((product, i) => {
                  return (
                    <tr key={i} className="bg-white transition-all duration-500 hover:bg-gray-50">
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{(currentPage - 1) * pageSize + i + 1}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                         <div className="flex items-center gap-5">
                          <Image
                            src={product.image_url}
                            alt="product"
                            className="object-cover rounded-xl" 
                            width={50}
                            height={50}
                          />
                          <p>{product.name}</p>  
                        </div>
                      </td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{product.price}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{product.quantity}</td>
                      <td className={`p-5 text-center whitespace-nowrap text-sm leading-6 font-medium ${handleStatusTextColor(product.status)}`}>{product.status}</td>
                      <td className="p-5">
                        <div className="flex justify-center items-center">
                          <button className="p-2  rounded-full  group transition-all duration-500  flex item-center cursor-pointer" onClick={() => setOpenDropdownIndex(openDropdownIndex === i ? null : i)}>
                            <BiDotsVerticalRounded />
                          </button>
                        </div>

                        {openDropdownIndex === i && (
                          <div
                            className="absolute right-20 w-40 rounded-md shadow-lg bg-white ring-1 ring-white ring-opacity-5"
                          >
                            <div className="py-1 border-b border-gray-300">
                              <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  setOpenViewDetailsModal(!openViewDetailsModal);
                                  setOpenDropdownIndex(null);
                                  setSelectedProduct(product);
                                }}
                              >
                                View Details
                              </button>
                            </div>
                            <div className="py-1 border-b border-gray-300">
                              <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  setOpenUpdateProductModal(!openUpdateProductModal);
                                  setOpenDropdownIndex(null);
                                  setSelectedProduct(product);
                                }}
                              >
                                Update
                              </button>
                            </div>
                            <div className="py-1 border-b border-gray-300">
                              <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleStatusChange(product.id, product.name, product.status)}
                              >
                                { product.status === "ACTIVE" ? "Deactivate" : "Activate"}
                              </button>
                            </div>
                            <div className="py-1 border-b border-gray-300">
                              <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleRemove(product.id, product.name)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                )}))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <Pagination 
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Add product modal */}
      {openAddProductModal && (
        <ProductAddModal 
          token={token}
          isAddUpdateOrDelete={isAddUpdateOrDelete}
          setIsAddUpdateOrDelete={setIsAddUpdateOrDelete}
          openAddProductModal={openAddProductModal}
          setOpenAddProductModal={setOpenAddProductModal}
        />
      )}

      {/* View product details modal */}
      {openViewDetailsModal && (
        <ProductViewDetailsModal 
          selectedProduct={selectedProduct}
          openViewDetailsModal={openViewDetailsModal}
          setOpenViewDetailsModal={setOpenViewDetailsModal}
        />
      )}

      {/* Update product modal */}
      {openUpdateProductModal && (
        <ProductUpdateModal
          token={token}
          selectedProduct={selectedProduct}
          isAddUpdateOrDelete={isAddUpdateOrDelete}
          setIsAddUpdateOrDelete={setIsAddUpdateOrDelete} 
          openUpdateProductModal={openUpdateProductModal}
          setOpenUpdateProductModal={setOpenUpdateProductModal}
        />
      )}
    </div>
  )
}

export default Products

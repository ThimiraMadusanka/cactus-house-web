"use client"
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination/Pagination"
import { contactStatusChange, deleteContact, getContacts } from "@/services/contact.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ContactTableData } from "@/types/contact.types";
import { FaEye, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const Contacts = () => {
  const [data, setData] = useState<ContactTableData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isUpdateOrDelete, setIsUpdateOrDelete] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const pageSize = 10;
  const router = useRouter();

  // fetch data
  const fetchContacts = async (token: string, currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await getContacts(token, currentPage, pageSize);
      console.log("response", response)
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
    const token = localStorage.getItem("token");
    if (token) {
      fetchContacts(token, currentPage);
      setIsError(false);
      setData([]);
      setToken(token);
    } else {
      router.push('/');
      toast.error("Someting went wrong!");
    }
  }, [currentPage, isUpdateOrDelete]);

  // read message modal
  const readMessage = (message: string) => {
    Swal.fire({
      title: "Message",
      text: message,
      confirmButtonText: "Ok",
      customClass: {
        confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
      },
      buttonsStyling: false,
    });
  }

  // handle status change
  const handleStatusChange = (id: number, name: string) => {
    Swal.fire({
      title: `Change status for this ${name} contact`,
      input: "select",
      inputOptions: {
        PENDING: "Pending",
        CONTACTED: "Contacted",
        BLOCKED: "Blocked"
      },
      inputPlaceholder: "Select a status",
      confirmButtonText: "Ok",
      customClass: {
        confirmButton: "p-1 px-2 bg-green-600 rounded text-white me-2",
        cancelButton: "p-1 px-2 bg-gray-600 rounded text-white",
        title: "text-capitalize pb-3",
      },
      buttonsStyling: false,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        statusChange(id, result.value);
      }
    });
  }

  // status change function
  const statusChange = async (id: number, status: string) => {
    try {
      const response = await contactStatusChange(token, id, status);

      if (response.status === 200) {
        // success popup for status change contact success
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
        setIsUpdateOrDelete(!isUpdateOrDelete);
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

  // remove contact
  const handleRemove = (id: number, name: string) => {
    Swal.fire({
      title: "Warning..!",
      text: `Are you sure you want to remove ${name}'s contact?`,
      icon: "warning",
      confirmButtonText: "Rmove Now",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        removeContact(id);
      }
    });
  };

  // remove contact function
  const removeContact = async (id: number) => {
    try {
      const response = await deleteContact(token, id);

      if (response.status === 204) {
        // success popup for remove contact success
        Swal.fire({
          title: "Success..!",
          text: "Contact removed successfully!",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
          },
          buttonsStyling: false,
        });
        setIsUpdateOrDelete(!isUpdateOrDelete);
      } else {
        // error popup for error while remove contact
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
    if (status === "PENDING") {
      return "text-amber-600";
    } else if (status === "CONTACTED") {
      return "text-green-600";
    } else if (status === "BLOCKED") {
      return "text-red-500";
    } else {
      return "text-gray-500";
    }
  }

  return (
    <div className="bg-white rounded-md ">
      <div className="p-5">
        <div className="pb-3 border-b border-gray-500">
          <h1 className="font-extrabold page_title">Contacts</h1>
        </div>
        <div className="pt-5">
          <div className="overflow-hidden ">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Index </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Name </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Email </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Status </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Actions </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 ">
                {/* For loading data */}
                {isLoading && (
                  <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                    <td colSpan={5} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* For Error */}
                {isError && (
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={5} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Something went wrong!</span>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && !isError && data.length === 0 ? (
                // Inform when there is no data
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={5} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <h5 className="fw-bold mb-0">No contacts found.</h5>
                  </td>
                </tr>
              ) : (
                data.map((contact, i) => {
                  return (
                    <tr key={i} className="bg-white transition-all duration-500 hover:bg-gray-50">
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{(currentPage - 1) * pageSize + i + 1}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{contact.name}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{contact.email}</td>
                      <td className={`p-5 text-center whitespace-nowrap text-sm leading-6 font-medium ${handleStatusTextColor(contact.status)}`}>{contact.status}</td>
                      <td className="p-5">
                        <div className="flex justify-center items-center gap-1">
                          <button className="p-2  rounded-full  group transition-all duration-500  flex item-center cursor-pointer" onClick={() => readMessage(contact.message)}>
                            <FaEye className="text-green-600" />
                          </button>
                          <button className="p-2 rounded-full  group transition-all duration-500  flex item-center cursor-pointer" onClick={() => handleStatusChange(contact.id, contact.name)}>
                            <FiEdit className="text-blue-700" />
                          </button>
                          <button className="p-2 rounded-full  group transition-all duration-500  flex item-center cursor-pointer" onClick={() => handleRemove(contact.id, contact.name)}>
                            <FaTrash className="text-red-500" />
                          </button>
                        </div>
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
    </div>
  )
}

export default Contacts

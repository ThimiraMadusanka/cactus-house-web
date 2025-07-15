"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Pagination from "@/components/ui/pagination/Pagination"
import { deleteUser, getUsers, resetPasswordUser, userStatusChange } from "@/services/user.service";
import { UserTableData } from "@/types/user.types";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Swal from "sweetalert2";

const Users = () => {
  const [data, setData] = useState<UserTableData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [token, setToken] = useState<string>("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [isAddUpdateOrDelete, setIsAddUpdateOrDelete] = useState<boolean>(false);

  const pageSize = 10;
  const router = useRouter();

  // fetch data
  const fetchContacts = async (token: string, currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await getUsers(token, currentPage, pageSize);
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
  }, [currentPage, isAddUpdateOrDelete]);

  // handle reset password
  const handleResetPassword = (id: number, name: string) => {
    setOpenDropdownIndex(null);
    Swal.fire({
      title: `Password reset for ${name}.`,
      input: "password",
      inputPlaceholder: "Enter new password",
      confirmButtonText: "Reset Now",
      customClass: {
        confirmButton: "p-1 px-2 bg-green-600 rounded text-white me-2",
        cancelButton: "p-1 px-2 bg-gray-600 rounded text-white",
        title: "text-capitalize pb-3",
      },
      inputAttributes: {
        autocorrect: "off"
      },
      buttonsStyling: false,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        resetPassword(id, result.value);
      }
    });
  }

  // reset password function
  const resetPassword = async (id: number, password: string) => {
    try {
      const response = await resetPasswordUser(token, id, { password: password });

      if (response.status === 200) {
        // success popup for password reset success
        Swal.fire({
          title: "Success..!",
          text: "Password reset successfully!",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
          },
          buttonsStyling: false,
        });
        setIsAddUpdateOrDelete(!isAddUpdateOrDelete);
      } else {
        // error popup for error while password reset
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
      const response = await userStatusChange(token, id, status);

      if (response.status === 200) {
        // success popup for status change user success
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

  // remove user
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
        removeUser(id);
      }
    });
  };

  // remove user function
  const removeUser = async (id: number) => {
    try {
      const response = await deleteUser(token, id);

      if (response.status === 204) {
        // success popup for remove user success
        Swal.fire({
          title: "Success..!",
          text: "User removed successfully!",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
          },
          buttonsStyling: false,
        });
        setIsAddUpdateOrDelete(!isAddUpdateOrDelete);
      } else {
        // error popup for error while remove user
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
      return "text-green-600";
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
          <h1 className="font-extrabold page_title">Users</h1>
          <button 
            type="button" 
            className="lime_btn py-1.5 px-5 text-sm"
          >
            Add New
          </button>
        </div>
        <div className="pt-5">
          <div className="overflow-hidden ">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Index </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Name </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Email </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Contact Number </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Billing Address </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Status </th>
                  <th scope="col" className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Actions </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 ">
                {/* For loading data */}
                {isLoading && (
                  <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                    <td colSpan={7} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* For Error */}
                {isError && (
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={7} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Something went wrong!</span>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && !isError && data.length === 0 ? (
                // Inform when there is no data
                <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                  <td colSpan={7} className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                    <h5 className="fw-bold mb-0">No users found.</h5>
                  </td>
                </tr>
              ) : (
                data.map((user, i) => {
                  return (
                    <tr key={i} className="bg-white transition-all duration-500 hover:bg-gray-50">
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{(currentPage - 1) * pageSize + i + 1}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{user.name}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{user.email}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{user.contact_number}</td>
                      <td className="p-5 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{user.billing_address}</td>
                      <td className={`p-5 text-center whitespace-nowrap text-sm leading-6 font-medium ${handleStatusTextColor(user.status)}`}>{user.status}</td>
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
                              >
                                Update
                              </button>
                            </div>
                            <div className="py-1 border-b border-gray-300">
                              <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleResetPassword(user.id, user.name)}
                              >
                                Reset Password
                              </button>
                            </div>
                            { user.type !== "ADMIN" && (<div className="py-1">
                              <div className="py-1 border-b border-gray-300">
                                <button
                                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => handleStatusChange(user.id, user.name, user.status)}
                                >
                                  { user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                                </button>
                              </div>
                                <button
                                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => handleRemove(user.id, user.name)}
                                >
                                  Remove
                                </button>
                              </div>
                            )}
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
    </div>
  )
}

export default Users

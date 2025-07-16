"use client"
import React, { useEffect, useState } from "react";
import { UpdateUser, UpdateUserInputValidation, UserTableData } from "@/types/user.types";
import { updateUser } from "@/services/user.service";
import Swal from "sweetalert2";

type UserUpdateModalProps = {
  token: string,
  selectedUser: UserTableData | null,
  isAddUpdateOrDelete: boolean,
  setIsAddUpdateOrDelete: React.Dispatch<React.SetStateAction<boolean>>,
  openUpdateUserModal: boolean,
  setOpenUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const UserUpdateModal = ({ 
  token,
  selectedUser,
  isAddUpdateOrDelete,
  setIsAddUpdateOrDelete,
  openUpdateUserModal, 
  setOpenUpdateUserModal 
}: UserUpdateModalProps) => {
  const [formData, setFormData] = useState<UpdateUser>({
      name: "",
      contact_number: "",
      billing_address: "",
  });
  const [userId, setUserId] = useState<number>(0);
  const [formValidationErrors, setFormValidationErrors] = useState<Partial<UpdateUserInputValidation>>({});
  const [loading, setLoading] = useState<boolean>(false);
  
  // Input field validation method
  const validate = () => {
    const inputErrors: Partial<UpdateUserInputValidation> = {};
    const contactNumberRegex = /^07\d{8}$/;
    if(formData.contact_number === "") {
      inputErrors.contact_number = "Contact number is required."
    } else {
      if (!contactNumberRegex.test(formData.contact_number)) {
        inputErrors.contact_number = "Invalid contact number."
      }
    }
    if(formData.name === "") inputErrors.name = "Full name is required."
    if(formData.billing_address === "") inputErrors.billing_address = "Address is required."
    return inputErrors;
  }

  // set user data
  useEffect(() => {
    if (selectedUser !== null) {
      setFormData({
        name: selectedUser.name,
        contact_number: selectedUser.contact_number,
        billing_address: selectedUser.billing_address
      });
      setUserId(selectedUser.id);
    } else {
      setOpenUpdateUserModal(!openUpdateUserModal);
    }
  }, [])

  // Method for input onChange 
  const handelOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Form reset
  const resetForm = () => {
    setFormData({
      name: "",
      contact_number: "",
      billing_address: "",
    })
  }

  // Form Submit
  const handelSubmit = async () => {
      try {
        setLoading(true);
        const newErrors = validate();
        if(Object.keys(newErrors).length === 0) {
          if (userId !== 0) {
            const response = await updateUser(token, userId, formData);
            if (response.status === 200) {
              // success popup for update user success
              Swal.fire({
                title: "Success..!",
                text: "User updated successfully!",
                icon: "success",
                confirmButtonText: "Ok",
                customClass: {
                  confirmButton: "p-1 px-2 bg-green-600 rounded text-white",
                },
                buttonsStyling: false,
              });
              resetForm();
              setIsAddUpdateOrDelete(!isAddUpdateOrDelete);
              setOpenUpdateUserModal(!openUpdateUserModal);
            } else {
              resetForm();
              setOpenUpdateUserModal(!openUpdateUserModal);
              // error popup for error while update user
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
          } else {
            resetForm();
            setOpenUpdateUserModal(!openUpdateUserModal);
            // error popup for no found user
            Swal.fire({
              title: "Ooops..!",
              text: "User not found.",
              icon: "error",
              confirmButtonText: "Ok",
              customClass: {
                confirmButton: "p-1 px-2 bg-red-600 rounded text-white",
              },
              buttonsStyling: false,
            });
          }
        } else {
          setFormValidationErrors(newErrors);
        }
      } catch (error: any) {
        resetForm();
        setOpenUpdateUserModal(!openUpdateUserModal);
        setLoading(false);
        console.log("Sign In error: ", error);
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
      } finally {
        setLoading(false);
      }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* modal */}
      <div className="relative max-w-md w-full border rounded-lg">
        <div className="flex flex-col p-5 rounded-lg shadow bg-white">
          <h2 className="font-semibold text-gray-800 mb-3" style={{ fontSize: "18px"}}>
            Update User
          </h2>
          <div className="relative mb-3">
            <label id="name" className="leading-7 text-sm text-gray-600">Name <span className='text-red-600'>*</span></label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={formData.name}
                onChange={(e) => handelOnChange(e)} 
            />
            {formValidationErrors.name && (<p className="text-red-700 mt-2">{formValidationErrors.name}</p>)}
          </div>
          <div className="relative mb-3">
              <label id="contact_number" className="leading-7 text-sm text-gray-600">Contact Number <span className='text-red-600'>*</span></label>
              <input 
                  type="text" 
                  id="contact_number" 
                  name="contact_number" 
                  className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={formData.contact_number}
                  onChange={(e) => handelOnChange(e)} 
              />
              {formValidationErrors.contact_number && (<p className="text-red-700 mt-2">{formValidationErrors.contact_number}</p>)}
          </div>
          <div className="relative mb-3">
              <label id="billing_address" className="leading-7 text-sm text-gray-600">Address <span className='text-red-600'>*</span></label>
              <input 
                  type="text" 
                  id="billing_address" 
                  name="billing_address" 
                  className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={formData.billing_address}
                  onChange={(e) => handelOnChange(e)} 
              />
              {formValidationErrors.billing_address && (<p className="text-red-700 mt-2">{formValidationErrors.billing_address}</p>)}
          </div>
          <div className="flex justify-end items-center mt-3">
            <button 
              type="button"
              disabled={loading}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md cursor-pointer" 
              onClick={() => setOpenUpdateUserModal(false)}
            >
              Cancel
            </button>
            <button 
              type="button"
              disabled={loading}
              className="px-4 py-2 ml-2 text-white bg-lime-800 hover:bg-lime-600 text-sm font-medium rounded-md cursor-pointer"
              onClick={() => handelSubmit()}
            >
              {loading? "Updating" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateModal;

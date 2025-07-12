"use client"
import { useState } from "react";

import { FaUserCircle } from "@node_modules/react-icons/fa"
import { LuMenu } from "@node_modules/react-icons/lu"
import Link from "@node_modules/next/link";

const AccountHeader = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
      <div className="flex items-center px-4">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700">
          <LuMenu size={25} />
        </button>
      </div>
      <div className="flex items-center gap-10 pr-4">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <Link href="/our-plants" className="text-gray-500 hover:text-gray-700">
          Our Plants
        </Link>
        <Link href="/contact-us" className="text-gray-500 hover:text-gray-700">
          Contact Us
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
        >
          <FaUserCircle size={30} />
        </button>
      </div>

      {open && (
        <div
          className="absolute right-6 top-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountHeader
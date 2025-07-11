"use client";

import Link from "next/link"
import Image from "next/image"

import { useState, useEffect } from "react"

const DashboardHeader = () => {
  const TOP_OFFSET = 50;
  const [isScroll, setIsScroll] = useState(false)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  // Handle Scroll for style changes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav className={`fixed w-full z-20 top-0 start-0 bg-black ${isScroll && "bg-[#EFFAEC]"}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        {/* Company Logo and Name */}
        <Link href="/" className="flex gap-2 justify-center items-center p-4" >
          <Image
            src={`/assets/images/${isScroll ? "logo-green" : "logo-white" }.png`}
            alt="Cactus Logo"
            width={20}
            height={20}
          />
          <p className={`max-sm:hidden font-semibold text-xl tracking-wide italic ${isScroll ? "text-[#21431E]" : "text-white" }`}>Cactus House</p>
        </Link>
        {/* Desktop Navigation */}
        <div className="sm:flex hidden p-4">
          <div className="flex gap-10 justify-center items-center">
            <Link href="/" className={`nav_link ${isScroll ? "text-[#21431E]" : "text-white" }`}>
              Home
            </Link>
            <Link href="/our-plants" className={`nav_link ${isScroll ? "text-[#21431E]" : "text-white" }`}>
              Our Plants
            </Link>
            <Link href="/contact-us" className={`nav_link ${isScroll ? "text-[#21431E]" : "text-white" }`}>
              Contact Us
            </Link>
            <button 
              type="button" 
              className="lime_btn py-1.5 px-5 text-sm"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative m-0">
          <div className="flex">
            <Image
              src={`/assets/icons/${isScroll ? "menu-green" : "menu-white" }.png`}
              alt="menu"
              width={37}
              height={37}
              onClick={() => setToggleDropdown((prev) => !prev)}
              className="mr-4"
            />

            {toggleDropdown && (
              <div className="absolute right-0 top-full p-5 rounded-lg bg-[#EFFAEC] w-screen flex flex-col gap-2 justify-center items-center">
                <Link href="/" className="text-[#21431E]">
                  Home
                </Link>
                <Link href="/our-plants" className="text-[#21431E]">
                  Our Plants
                </Link>
                <Link href="/contact-us" className="text-[#21431E]">
                  Contact Us
                </Link>
                <button 
                  type="button" 
                  className="lime_btn py-1.5 px-5 text-sm"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardHeader
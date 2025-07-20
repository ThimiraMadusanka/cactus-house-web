"use client";

import Link from "next/link"
import Image from "next/image"

import { useState, useEffect } from "react"
import { TbUser } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { AuthenticatedUser } from "@/types/auth.types";
import { getAllCartItemsByUserId } from "@/services/cart.service";

const LandingHeader = () => {
  const TOP_OFFSET = 50;
  const [isScroll, setIsScroll] = useState(false)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [user, setUser] = useState<AuthenticatedUser>({
    name: "",
    email: "",
    contact_number: "",
    billing_address: "",
    type: "USER",
  });
  const [cartCount, setCartCount] = useState<number>(0);
  const router = useRouter();

   // fetch data
  const fetchCartData = async (token: string, userRid: number) => {
    try {
      const response = await getAllCartItemsByUserId(token, userRid);
      if (response.status === 200) {
        const cartData = response.data;
        console.log("DDDDDD", cartData)
        setCartCount(cartData.length);
      } 
    } catch (error) {
      console.log("Err", error);
    } 
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("user_type");
    const storedUser = localStorage.getItem("user");
    setToken(storedToken);
    setUserType(storedUserType);
    if (storedUser && storedToken && storedUserType) {
      const user = JSON.parse(storedUser);
      setUser(user);
      if (storedUserType === "USER") {
        fetchCartData(storedToken, user.id);
      }
    }  
}, []);

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

  const handleProfileButton = () => {
    if (userType === "ADMIN") {
      router.push('/admin')
    } else if (userType === "USER") {
      router.push('/account')
    } else {
      router.push('/')
    }
  }

  return (
    <nav className={`fixed w-full z-20 top-0 start-0 ${isScroll && "bg-[#EFFAEC]"}`}>
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
            {!token ? (
              <>
                <button 
                  type="button" 
                  className={`flex justify-center items-center border ${isScroll ? "border-black text-black" : "border-white text-white"} rounded-md gap-2  py-1.5 px-5 text-sm cursor-pointer`}
                  onClick={() => router.push('/sign-in')}
                >
                  <TbUser size={18} color={isScroll ? "#000" : "#fff"} />
                  Sign In
                </button>
                <button 
                  type="button" 
                  className="lime_btn py-1.5 px-5 text-sm cursor-pointer"
                  onClick={() => router.push('/sign-up')}
                >
                  Create a Account
                </button>
              </>
            ) : (
              <>
                {userType === "USER" && (
                  <button
                    onClick={() => router.push('/account/cart')}
                    className="relative text-[#21431E] hover:text-gray-500 cursor-pointer"
                  >
                    <FaShoppingCart size={24} color={isScroll ? "#000" : "#fff"} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                )}
                <button
                  onClick={() => handleProfileButton()}
                  className={`flex gap-2 items-center ${isScroll ? "text-[#21431E]" : "text-white"} hover:text-gray-400 focus:outline-none cursor-pointer`}
                >
                  <div className="flex flex-col items-end">
                    <p style={{ fontSize: "12px" }}>{user.name}</p>
                    <p style={{ fontSize: "10px" }}>{user.email}</p>
                  </div>
                  <FaUserCircle size={30} />
                </button>
              </>
            )}
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
                {!token ? (
                  <>
                    <button 
                      type="button" 
                      className="py-1.5 px-5 text-sm cursor-pointer"
                      onClick={() => router.push('/sign-in')}
                    >
                      Sign In
                    </button>
                    <button 
                      type="button" 
                      className="lime_btn py-1.5 px-5 text-sm cursor-pointer"
                      onClick={() => router.push('/sign-up')}
                    >
                      Create a Account
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleProfileButton()}
                    className={`flex gap-2 items-center text-[#21431E] hover:text-gray-400 focus:outline-none cursor-pointer`}
                  >
                    <FaUserCircle size={30} />
                    <div className="flex flex-col items-start">
                      <p style={{ fontSize: "12px" }}>{user.name}</p>
                      <p style={{ fontSize: "10px" }}>{user.email}</p>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default LandingHeader
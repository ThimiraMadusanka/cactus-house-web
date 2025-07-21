import Link from "next/link"
import Image from "next/image"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Footer Background */}
      <div className="absolute inset-0">
        <div className="footer" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      {/* Footer Content */}
      <div className="relative mx-auto max-w-7xl py-12 px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-4">
          <div className="space-y-6 xl:col-span-1 flex flex-col xl:items-start items-center xl:pb-0 pb-5">
            {/* Company Logo and Name */}
            <Link href="/" className="flex gap-2 items-center" >
              <Image
                src="/assets/images/logo-white.png"
                alt="Cactus Logo"
                width={20}
                height={20}
              />
              <p className="font-semibold text-xl text-white tracking-wide italic">Cactus House</p>
            </Link>
            {/* About Company */}
            <p className="text-white text-sm text-center xl:text-left">The Reliable and Professional Cactus Plant Website in Sri Lanka is Cactus House that services you.</p>
            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a href="#" className="text-white hover:text-gray-400">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          {/* Links Section */}
          <div className="xl:col-span-1 xl:pb-0 pb-5">
            <ul className="flex flex-col items-center space-y-4">
              <li>
                <Link href="/"  className="text-base text-white hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/our-plants"  className="text-base text-white hover:text-gray-400">
                  Our Plants
                </Link>
              </li>
              <li>
                <Link href="/contact-us"  className="text-base text-white hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <address className="not-italic text-white">
              <p>No 07, R. A. De Mel Mawatha, </p>
              <p>Colombo 10, Sri Lanka.</p>
              <p className="mt-2">Email: <a href="mailto:info@company.com" className="hover:text-white transition">cactusHouse@gmail.com</a></p>
              <p>Phone: <a href="tel:+11234567890" className="hover:text-white transition">+94 (76) 457-8560</a></p>
            </address>
          </div>
        </div>
      </div>
      {/* Copy Right Section */}
      <div className="relative flex justify-center">
        <div className="border-t w-10/12 border-gray-200 py-8">
          <p className="text-base text-white text-center">© 2024 Cactus House, Inc. All rights reserved. Developed by Thimira Madusanka</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
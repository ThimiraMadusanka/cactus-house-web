import Image from "next/image"
import { AiFillDashboard } from "react-icons/ai"
import { BsTelephoneFill } from "react-icons/bs"
import { FaBoxOpen, FaShoppingCart, FaUser } from "react-icons/fa"
import { TbSettingsFilled } from "react-icons/tb"

const AdminSideBar = () => {
  return (
    <div className="md:flex flex-col w-64 bg-lime-950">
        <div className="flex items-center justify-center h-16 bg-lime-900 gap-2">
            <Image
                src="/assets/images/logo-white.png"
                alt="Cactus Logo"
                width={15}
                height={15}
            />
            <span className="text-white font-bold uppercase">Cactus House</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="space-y-2 mt-4 px-4">
                <a href="/admin" className="sidenav_items">
                    <AiFillDashboard size={20} />
                    Dashboard
                </a>
                <a href="/admin/orders" className="sidenav_items">
                    <FaShoppingCart size={20} />
                    Orders
                </a>
                <a href="/admin/products" className="sidenav_items">
                    <FaBoxOpen size={20} />
                    Products
                </a>
                <a href="/admin/settings" className="sidenav_items">
                    <TbSettingsFilled size={20} />
                    Settings
                </a>
                <a href="/admin/users" className="sidenav_items">
                    <FaUser size={20} />
                    Users
                </a>
                <a href="/admin/contacts" className="sidenav_items">
                    <BsTelephoneFill size={20} />
                    Contacts
                </a>
            </div>
        </div>
    </div>
  )
}

export default AdminSideBar
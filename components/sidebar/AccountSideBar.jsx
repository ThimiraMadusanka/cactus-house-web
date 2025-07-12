import Image from '@node_modules/next/image'
import { AiFillDashboard } from '@node_modules/react-icons/ai'
import { FaBoxOpen, FaShoppingCart, FaUser } from '@node_modules/react-icons/fa'

const AccountSideBar = () => {
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
                <a href="/account" className="sidenav_items">
                    <AiFillDashboard size={20} />
                    Dashboard
                </a>
                <a href="/account/cart" className="sidenav_items">
                    <FaShoppingCart size={20} />
                    Cart
                </a>
                <a href="/account/orders" className="sidenav_items">
                    <FaBoxOpen size={20} />
                    Orders
                </a>
                <a href="/account/profile" className="sidenav_items">
                    <FaUser size={20} />
                    Profile
                </a>
            </div>
        </div>
    </div>
  )
}

export default AccountSideBar
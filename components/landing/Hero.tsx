import Link from "next/link"

const Hero = () => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <div className="hero" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
       {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        {/* Hero Title */}
        <h1 className="text-5xl font-bold leading-tight mb-4">Cactus Make Your Home Beautiful</h1>
        {/* Hero Sub Title */}
        <p className="text-md text-gray-300 mb-8">
          Order quality cactus online for your home and get it delivered to your doorstep. 
        </p>
        {/* Hero Button */}
        <div className="rounded-md shadow">
          <Link href="/our-plants" className="lime_btn w-full px-8 py-3 md:py-4 md:text-lg md:px-10">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
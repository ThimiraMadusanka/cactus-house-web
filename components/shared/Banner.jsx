import Link from "next/link"

const Banner = ({ topBanner, bannerTitle, bannerSubTitle, bannerButton, bannerButtonText, bannerButtonPath }) => {
  return (
    <div className="relative text-white overflow-hidden">
      {/* Banner Background */}
      <div className="absolute inset-0">
        <div className="banner" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      {/* Banner Content */}
      <div className={`relative mx-auto max-w-7xl pt-20 px-6 lg:px-8 ${topBanner ? "flex flex-col justify-center items-center pb-0" : "pb-20" }`}>
        {/* Banner Title */}
        <h1 className="text-4xl font-bold leading-tight mb-4">{bannerTitle}</h1>
        {/* Banner Sub Title */}
        <p className={`text-md text-gray-300 mb-8 ${topBanner && "text-center" }`}>{bannerSubTitle}</p>
        {/* Banner Button */}
        {bannerButton && (
          <Link href={bannerButtonPath} className="lime_btn px-6 py-2">
            {bannerButtonText}
          </Link>
        )}
      </div>
    </div>
  )
}

export default Banner
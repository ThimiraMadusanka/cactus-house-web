
const Map = () => {
  return (
    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
        {/* Map */}
        <iframe 
            width="100%" 
            height="100%" 
            className="absolute inset-0" 
            frameborder="0" 
            title="map" 
            marginheight="0"
            marginwidth="0" 
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7921.897528526329!2d79.8549334!3d6.8967319!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591861cfd571%3A0x36d4865fec5f2c51!2sINIVOS%20Consulting%20(Private)%20Limited!5e0!3m2!1sen!2slk!4v1677065138623!5m2!1sen!2slk"
        />
        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
            {/* Address */}
            <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                <p className="mt-1">No 07, R. A. De Mel Mawatha, Colombo 10, Sri Lanka.</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                {/* Email */}
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                <a className="leading-relaxed">cactusHouse@email.com</a>
                {/* Contact Number */}
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed">+94-76-4578560</p>
            </div>
        </div>
    </div>
  )
}

export default Map
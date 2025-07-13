import Image from "next/image"

const Feed = () => {
  return (
    <section className="py-8 bg-[#EFFAEC]">
      <div className="mx-auto max-w-7xl py-12 px-6 lg:py-16 lg:px-8">
        {/* Section Name */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-4xl font-bold green__text">
                Instagram Feed
            </h2>
        </div>
        {/* Image Section */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8 pt-10">
          {/* Image 1 */}
          <div className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
            <Image 
              src="https://images.unsplash.com/photo-1543172683-f311a64404fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Photo by Minh Pham" 
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              fill
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
          </div>
          {/* Image 2 */}
          <div className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
            <Image 
              src="https://images.unsplash.com/photo-1536069221282-d877868cad6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Photo by Magicle" 
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              fill 
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
          </div>
          {/* Image 3 */}
          <div className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
            <Image 
              src="https://images.unsplash.com/photo-1562200830-e9d4c9d6868e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Photo by Martin Sanchez" 
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              fill 
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
          </div>
          {/* Image 4 */}
          <div className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
            <Image 
              src="https://images.unsplash.com/photo-1656495616109-304dcd5be8ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Photo by Lorenzo Herrera" 
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" 
              fill
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feed
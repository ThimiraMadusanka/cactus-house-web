import Image from "next/image"

const AboutUs = () => {
  return (
    <section className="py-8 bg-white sm:py-10 lg:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section Name */}
            <h2 className="text-center text-4xl font-bold green__text">
                About Us
            </h2>
            <div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-14 gap-4 py-12">
                {/* About Us paragraph */}
                <p className='text-justify leading-8'>
                    Cactus House stands as a premier online destination for cactus enthusiasts and green thumbs alike. 
                    Founded on a passion for the rugged beauty of cacti, our mission is to bring a touch of the desert 
                    into every home. From the majestic Saguaro to the delightful Pincushion, we meticulously curate our 
                    collection to ensure the highest quality and variety. Each cactus is hand-picked, ensuring it arrives 
                    at your doorstep ready to thrive. At Cactus House, we believe that everyone deserves a piece of the desert's 
                    enduring spirit, and we're committed to providing exceptional care tips and customer service to make cactus 
                    care as seamless as possible. Whether you're a seasoned collector or new to the world of cacti, Cactus House 
                    is your ultimate source for all things cactus.
                </p>
                <Image 
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Group Photo"
                    className="h-96 w-full object-cover object-center rounded-xl" 
                    width={500}
                    height={500}
                />
            </div>
        </div>
    </section>
  )
}

export default AboutUs
import LandingLayout from "@components/layout/LandingLayout"
import { Banner } from "@components/shared"
import { ProductCard } from "@components/ui/card"

const OurPlants = () => {
  return (
    <LandingLayout>
      {/* Banner Section */}
      <Banner 
        topBanner
        bannerTitle="Our Plants"
        bannerSubTitle="Choose your favorite Cactus plant in our store."
      />
      {/* Product Card Section */}
      <section className="w-fit pt-14 pb-20 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14">
        {/* Product 1 Card */}
        <ProductCard
          imageUrl="https://images.unsplash.com/photo-1613372998667-b83ab5bbe081?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          productName="Thanksgiving Cactus"
          productPrice="$147"
        />
        {/* Product 2 Card */}
        <ProductCard 
          imageUrl="https://images.unsplash.com/photo-1621274220348-41dc235ff439?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          productName="Thimble Cactus"
          productPrice="$102"
        />
        {/* Product 3 Card */}
        <ProductCard 
          imageUrl="https://images.unsplash.com/photo-1619765872225-767d1fd77fe9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          productName="Ric Rac Cactus"
          productPrice="$250"
        />
        {/* Product 4 Card */}
        <ProductCard 
          imageUrl="https://images.unsplash.com/photo-1623804322653-ef9afccae982?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          productName="Fairy Castle Cactus"
          productPrice="$90"
        />
        {/* Product 5 Card */}
        <ProductCard 
          imageUrl="https://images.unsplash.com/photo-1531797611996-666aa1f3df08?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          productName="Old Lady Cactus"
          productPrice="$165"
        />
        {/* Product 6 Card */}
        <ProductCard 
          imageUrl="https://images.unsplash.com/photo-1519336056116-bc0f1771dec8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          productName="Easter Cactus"
          productPrice="$195"
        />
      </section>
    </LandingLayout>
  )
}

export default OurPlants
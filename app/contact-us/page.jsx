import { ContactForm, Map } from "@components/contactUs"
import { Banner } from "@components/shared"

const page = () => {
  return (
    <>
      {/* Banner Section */}
      <Banner 
        topBanner
        bannerTitle="Contact Us"
        bannerSubTitle="You can get in touch directly or fill in the form on the right and we'll get back to you ASAP (within 24 hours)."
      />
      {/* Map and Form Section */}
      <section className="text-gray-600 body-font relative bg-[#EFFAEC]">
        <div className="pt-14 pb-20 flex sm:flex-nowrap flex-wrap mx-auto max-w-7xl px-6 lg:px-8">
          {/* Map */}
          <Map />
          {/* Contact Us Form */}
          <ContactForm />
        </div>
      </section>
    </>
  )
}

export default page
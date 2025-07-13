import { AboutUs, Feed, Hero, WhyChooseUs } from "@/components/landing";
import LandingLayout from "@/components/layout/LandingLayout";
import { Banner } from "@/components/shared";

export default function Home() {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <Hero />
      {/* About Us Section */}
      <AboutUs />
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      {/* Banner Section */}
      <Banner
        bannerTitle="You Deserve The Best"
        bannerSubTitle="View our Cactus plants collection"
        bannerButton
        bannerButtonPath="/our-plants"
        bannerButtonText="Shop Now"
      />
      {/* Instagram Feed Section  */}
      <Feed />
    </LandingLayout>
  );
}

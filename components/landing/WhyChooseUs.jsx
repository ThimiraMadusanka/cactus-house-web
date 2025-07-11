import WhyChooseUsCard from "@components/ui/card/WhyChooseUsCard";

import { TbTruckDelivery } from "react-icons/tb";
import { BsBarChartFill } from "react-icons/bs";
import { AiOutlineSafety } from "react-icons/ai";
import { LuBadgeCheck } from "react-icons/lu";

const WhyChooseUs = () => {
  return (
    <section className="py-8 bg-[#EFFAEC] sm:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section Name */}
            <h2 className="text-center text-4xl font-bold green__text">
                Why Choose Us?
            </h2>
            {/* Why Choose Us Cards */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                {/* Feature 1 */}
                <WhyChooseUsCard 
                    icon={<TbTruckDelivery size={30} color="#21431E" />}
                    cardTitle="Fast Delivery"
                    cardDescription="We'll bring your Cactus to your door, anywhere."
                />
                {/* Feature 2 */}
                <WhyChooseUsCard 
                    icon={<BsBarChartFill size={25} color="#21431E" />}
                    cardTitle="Grow With Us"
                    cardDescription="Exclusive Cactus tips, new releases and sales."
                />
                {/* Feature 3 */}
                <WhyChooseUsCard 
                    icon={<LuBadgeCheck size={30} color="#21431E" />}
                    cardTitle="Unbeatable Quality"
                    cardDescription="We source directly from top-rated growers."
                />
                {/* Feature 4 */}
                <WhyChooseUsCard 
                    icon={<AiOutlineSafety size={30} color="#21431E" />}
                    cardTitle="Security"
                    cardDescription="Our system guarantes the good security."
                />
            </div>
        </div>
    </section>
  )
}

export default WhyChooseUs

const WhyChooseUsCard = ({ icon, cardTitle, cardDescription}) => {
  return (
    <div className="flex flex-col justify-center items-center p-14">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D4EDC9] flex justify-center items-center">
            {icon}
        </div>
        {/* Title */}
        <h3 className="mt-6 text-xl font-bold green__text text-center">{cardTitle}</h3>
        {/* Description */}
        <p className="mt-5 text-base text-gray-600 text-center">{cardDescription}</p>
    </div>
  )
}

export default WhyChooseUsCard
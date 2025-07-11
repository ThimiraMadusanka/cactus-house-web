
const ContactForm = () => {
  return (
    <form className="lg:w-1/3 md:w-1/2  flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        {/* From Title and Sub Title */}
        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Got a Question?</h2>
        <p className="leading-relaxed mb-5 text-gray-600">Please share your questions with us.</p>
        {/* Name */}
        <div className="relative mb-4">
            <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-lime-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            />
        </div>
        {/* Email */}
        <div className="relative mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-lime-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            />
        </div>
        {/* Message */}
        <div className="relative mb-4">
            <label for="message" className="leading-7 text-sm text-gray-600">Message</label>
            <textarea 
                id="message" 
                name="message" 
                className="w-full bg-white rounded border border-gray-300 focus:border-lime-700 focus:ring-2 focus:ring-lime-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
        </div>
        {/* Button */}
        <button className="lime_btn py-2 px-6 text-lg">Button</button>
    </form>
  )
}

export default ContactForm
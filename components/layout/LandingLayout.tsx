"use client"
import { useState } from "react";
import Footer from "../Footer"
import { LandingHeader } from "../header"
import Chat from "../shared/Chat";
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";

type LandingLayoutProps = {
  children: React.ReactNode;
};

const LandingLayout = ({children} : LandingLayoutProps) => {
   const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative">
      <LandingHeader />
      {children}
      <Footer />

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-lime-800 hover:bg-lime-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50"
      >
        {isChatOpen? <IoClose size={30} /> : <IoChatbubbleEllipsesOutline size={30} />}
      </button>

      {isChatOpen && (
        <div className="fixed bottom-15 right-15 z-40 bg-white shadow-xl rounded-lg w-80 max-h-[70vh] overflow-hidden">
          <Chat />
        </div>
      )}
    </div>
  )
}

export default LandingLayout

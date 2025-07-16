import React from 'react'
import { MdDesktopAccessDisabled } from 'react-icons/md'

const AccessDenied = () => {
  return (
    <div className="h-screen mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center bg-[#EFFAEC]">
        <div className="max-w-md w-full text-center">

            <div className="flex justify-center mb-8">
                <MdDesktopAccessDisabled size={150} className="text-lime-950" />
            </div>

            <h1 className="text-5xl font-bold mb-4 text-lime-800">Access Denied!</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
                Oops! You have no permission for the page you're looking.
            </p>

            <div className="flex justify-center">
                <a href="/"
                    className="px-6 py-3 bg-lime-800 hover:bg-lime-900 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Go Back Home
                </a>
            </div>
        </div>
    </div>
  )
}

export default AccessDenied
import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const Pagination = () => {
    return (
        <div className="flex items-center">
            <button className=" p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                <MdArrowBackIos size={8} />
            </button>
            <button className="px-4 py-2 border text-base text-indigo-500 bg-white hover:bg-gray-100">
                1
            </button>
            <button className="p-4 border-t border-b border-r text-base rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                <MdArrowForwardIos size={8} />
            </button>
        </div>
    )
}

export default Pagination
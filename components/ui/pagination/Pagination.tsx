"use client"
import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

type PaginationProps = {
    totalPages: number,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
};

const Pagination = ({ totalPages, currentPage, setCurrentPage}: PaginationProps) => {
    // pagination next and prev button handling function
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // pagination page number list handel function
    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        return [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);
    };

    return (
        <div className="flex items-center">
            <button 
                className=" p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                aria-label='Previous'
                disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
            >
                <MdArrowBackIos size={8} />
            </button>
            {getPageNumbers().map((page) => (
                <button
                    className={`px-4 py-2 border text-base ${currentPage === page ? "text-white bg-lime-800 hover:bg-lime-600" : "text-lime-800 bg-white hover:bg-lime-200"}`}
                    key={page}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button 
                className="p-4 border-t border-b border-r text-base rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                aria-label="Next"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <MdArrowForwardIos size={8} />
            </button>
        </div>
    )
}

export default Pagination
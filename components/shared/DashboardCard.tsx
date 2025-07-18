"use client"
import React, { JSX } from 'react';

type DashboardCardProps = {
    title: string,
    number: number,
    iconBackgroundColor: string,
    numberColor: string,
    icon: JSX.Element; 
}

const DashboardCard = ({ title, number, iconBackgroundColor, numberColor, icon}: DashboardCardProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex gap-4">
                <div className={`${iconBackgroundColor} rounded-lg p-5`}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h2 className={`text-3xl font-bold ${numberColor} mt-2`}>{number}</h2>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard
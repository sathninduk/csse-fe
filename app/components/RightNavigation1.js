import React from 'react';

const RightNavigation1 = () => {
    return (
        <nav className="bg-transparent w-16 h-full fixed top-24 right-1">
            {/* Add your navigation items here */}
            {/* Example item */}
            <a href="#" className="grid justify-center p-4 text-white hover:bg-gray-700">
                <span className={"StatusBarIcon w-full"}>99+</span>
                <p className="text-xs font-normal text-center mt-1" style={{fontSize: "10px"}}>Pages</p>
            </a>
            <a href="#" className="grid justify-center p-4 text-white hover:bg-gray-700">
                <span className={"StatusBarIcon w-full text-center"}>99+</span>
                <p className="text-xs font-normal text-center mt-1" style={{fontSize: "10px"}}>Storage</p>
            </a>
            <a href="#" className="grid justify-center p-4 text-white hover:bg-gray-700">
                <span className={"StatusBarIcon w-full"}>99+</span>
                <p className="text-xs font-normal text-center mt-1" style={{fontSize: "10px"}}>
                    Inbox
                </p>
            </a>
            <a href="#" className="grid justify-center p-4 text-white hover:bg-gray-700">
                <span className={"StatusBarIcon w-full"}>99+</span>
                <p className="text-xs font-normal text-center mt-1" style={{fontSize: "10px"}}>Visitors</p>
            </a>
            {/* Add more items as needed */}
        </nav>
    );
};

export default RightNavigation1;

'use client'

import Image from 'next/image';
import Link from'next/link';
import { FaSearch } from "react-icons/fa"
import { IoCloseOutline } from "react-icons/io5"
import { useState } from "react"
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const navList = [
        {
            title: "Home",
            link: "/"

        },
        {
            title: "Shop",
            link: "/shop"

        },
        {
            title: "About Us",
            link: "/about"

        },
        {
            title: "Studio",
            link: "/studio"

        },
    ]
    const [searchQuery, setSearchQuery] = useState("")
    const PathName = usePathname()
    return (
        <header className="flex flex-col relative z-0 sticky">
            <div className="bg-teal-200 w-full flex justify-center">
                <p className="text-gray-700 p-1 text-center text-md">Price match guarantee - find a better deal? We'll match it!</p>
            </div>
            <div className="flex flex-col space-x-6 p-4">
                <div className="flex justify-between border-b-[1px] border-b-gray-300">
                    <div className="text-3xl font-weight-700 text-bold"><h1>Payless4Tech</h1></div>
                    <nav className="mt-1 text-sm">
                       
                        <ul className="flex space-x-8 ml-7">
                            {navList.map((item) => (
                                <Link href={item?.link} key={item?.link} className={`flex hover:font-medium ${PathName === item?.link ? 'text-gray-400' : ''}`}>
                                    {item?.title}
                                </Link>
                            ))}
                            <Link href=""><li>Categories</li></Link>
                        </ul>
                    </nav>

                    <div className="flex space-x-4 text-sm">
                        {/*Search bar*/}
                        <div>
                            <form className="flex space-x-2 border border-gray-200 p-1 rounded-full w-[300px]">
                                <input
                                    type="text"
                                    placeholder="Search for products"
                                    className="border-none 
                                    bg-transparent outline-none rounded-full p-1 w-11/12 items-center"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                />
                                {searchQuery ? (
                                    <IoCloseOutline
                                        onClick={() => setSearchQuery("")}
                                        className="w-7 h-7 hover:text-orange-300 duration-200 hover:cursor-pointer mx-1 p-1"
                                    />
                                ) : (
                                    <FaSearch className="w-7 h-7 hover-cursor-pointer mx-1 p-1"/>
                                )}
                            </form>
                        </div>
                        <div className="py-2 px-3 space-x-4 -mt-1">
                            {/*User*/}
                            <button className="rounded-full">
                                <Image
                                    src="/p.svg"
                                    alt="user"
                                    width={30}
                                    height={30}
                                />
                            </button>
                            {/*Cart*/}
                            <button className="rounded-full">
                                <Image
                                    src="/cart-icon.svg"
                                    alt="cart"
                                    width={30}
                                    height={30}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
    );
};

export default Navbar;
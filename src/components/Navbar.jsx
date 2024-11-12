'use client'

import Image from 'next/image';
import Link from 'next/link';
import { IoCloseOutline } from "react-icons/io5"
import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation';

import { useStateContext } from '@/lib/StateContext';
import Cart from './Cart';

const Navbar = () => {
    const navList = [
        { title: "Home", link: "/" },
        { title: "Shop", link: "/shop" },
        { title: "Categories", link: "/categories" },
        { title: "About Us", link: "/about" },
        //{ title: "Studio", link: "/studio" },
    ]
    const [searchQuery, setSearchQuery] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const PathName = usePathname()
    const { showCart, setshowCart, totalQuantities } = useStateContext();

    useEffect(() => {
        // Close mobile menu when route changes
        setMobileMenuOpen(false);
    }, [PathName]);

    // Function to toggle mobile menu
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <header className="flex flex-col z-10 h-auto top-0 bg-white shadow-sm w-full">
            <div className="bg-orange-100 w-full flex justify-center">
                <p className="text-gray-700 p-1 text-center text-sm md:text-md">Price match guarantee - find a better deal? We'll match it!</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b-[1px] w-full border-b-gray-200 h-auto">
                <div className="flex justify-between items-center w-full md:w-auto">
                    <Link href="/" className="text-2xl md:text-4xl font-semibold"><h1>Payless4Tech</h1></Link>
                    <button 
                        className="md:hidden"
                        onClick={toggleMobileMenu}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? (
                            <IoCloseOutline className="w-8 h-8" />
                        ) : (
                            <Image src="/hamburger.svg" alt="menu" width={30} height={30} />
                        )}
                    </button>
                </div>

                <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row justify-between items-center w-full md:w-3/4 mt-4 md:mt-0`}>
                    <ul className="flex flex-col md:pl-20 md:flex-row space-y-2 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
                        {navList.map((item) => (
                            <li key={item.link}>
                                <Link href={item.link} className={`flex hover:font-medium ${PathName === item.link ? 'text-gray-400' : ''}`}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center w-full md:w-auto">
                        <div className="flex space-x-2 border border-gray-200 rounded-full w-full md:w-[250px]">
                            <input
                                type="text"
                                placeholder="Search for products"
                                className="border-none bg-transparent outline-none rounded-full p-2 h-auto w-full"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                            />
                            <button
                                onClick={() => setSearchQuery("")}
                                className="flex items-center justify-center w-10"
                                aria-label="Clear search"
                            >
                                {searchQuery ? (
                                    <IoCloseOutline className="w-7 h-7 hover:text-gray-800 duration-200 hover:cursor-pointer" />
                                ) : (
                                    <Image
                                        src="/search-icon.svg"
                                        className="hover:cursor-pointer"
                                        alt="search"
                                        width={30}
                                        height={30}
                                    />
                                )}
                            </button>
                        </div>
                        <div className="flex p-2 space-x-5">
                            <Link href="/sign-up" aria-label="Sign up">
                                <button className="rounded-full">
                                    <Image
                                        src="/p.svg"
                                        alt="user"
                                        width={30}
                                        height={30}
                                    />
                                </button>
                            </Link>
                            <div className="relative cursor-pointer" onClick={() => setshowCart(true)}>
                                <button className="rounded-full" aria-label="Open cart">
                                    <Image
                                        src="/cart-icon.svg"
                                        alt="cart"
                                        width={30}
                                        height={30}
                                    />
                                </button>
                                <div className="bg-orange-500 w-[18px] h-[18px] absolute -right-1 top-0 rounded-full text-white flex items-center justify-center text-sm font-medium">
                                    <span className="sr-only">Items in cart:</span>
                                    {totalQuantities}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {showCart && <Cart />}
            </div>
        </header>
    );
};

export default Navbar;
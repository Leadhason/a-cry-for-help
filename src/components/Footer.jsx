import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="flex flex-col bg-black text-gray-300 z-0 text-sm">
            <div className="w-full p-5 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col space-y-6">
                        <div>
                            <h1 className="text-white">Address</h1>
                            <p className="text-sm text-gray-400 mt-1">4517 Washington Ave. Manchester, <br/>Kentucky 39495</p>
                        </div>
                        <div>
                            <h1 className="text-white">Mailbox</h1>
                            <p className="text-sm mt-1 text-gray-400">example@example.com</p>
                        </div>
                        <div>
                            <h3 className="text-white">Contact</h3>
                            <p className="text-sm mt-1 text-gray-400">0123456789</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-between gap-8 md:gap-10">
                        <div className="flex flex-col space-y-5">
                            <h3 className="text-white">Pages</h3>
                            <ul className="text-sm text-gray-400 space-y-2">
                               <Link href="/" className='hover:text-white'><li>Home</li></Link>
                               <Link href="/" className='hover:text-white'><li>Shop</li></Link>
                               <Link href="/" className='hover:text-white'><li>About Us</li></Link>
                               <Link href="/" className='hover:text-white'><li>Categories</li></Link>
                               <Link href="/studio" className='hover:text-white'><li>Studio</li></Link>
                            </ul>
                        </div>

                        <div className="flex flex-col space-y-5">
                            <h3 className="text-white">Resources</h3>
                            <ul className="text-sm text-gray-400 space-y-2">
                               <Link href="/" className='hover:text-white'><li>Blogs</li></Link>
                               <Link href="/" className='hover:text-white'><li>FAQs</li></Link>
                               <Link href="/" className='hover:text-white'><li>Reviews</li></Link>
                            </ul>
                        </div>

                        <div className="flex flex-col space-y-5">
                            <h3 className="flex flex-none text-white">Social Media</h3>
                            <ul className="text-sm text-gray-400 space-y-2">
                               <Link href="/" className='hover:text-white'><li>Twitter</li></Link>
                               <Link href="/" className='hover:text-white'><li>Tiktok</li></Link>
                               <Link href="/" className='hover:text-white'><li>Instagram</li></Link>
                               <Link href="/" className='hover:text-white'><li>Facebook</li></Link>
                               <Link href="/" className='hover:text-white'><li>LinkedIn</li></Link>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col mt-8 lg:mt-0 lg:ml-20">
                        <h3 className="font-medium text-white">Newsletter</h3>
                        <p className="text-sm text-gray-400">Subscribe to our newsletter to get the latest updates</p>
                        <form className="flex flex-col mt-2 space-y-2 text-sm">
                            <div className="flex flex-col mb-3 space-y-2">
                                <input type="text" placeholder="Enter your name" className="p-2 w-full lg:w-60 rounded-md text-gray-300 border border-gray-500 bg-transparent"/>
                                <input type="text" placeholder="Enter your email" className="p-2 w-full lg:w-60 rounded-md text-gray-300 border border-gray-500 bg-transparent"/>
                            </div>
                            <button className="bg-transparent text-white p-2 rounded-md mt-5 w-full lg:w-60 border border-gray-500">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <hr className="w-full bg-gray-600 mt-5"/>
            <div className="flex flex-col md:flex-row text-center mt-5 justify-between px-4 md:px-8 text-sm text-gray-400 py-2 mb-3 space-y-2 md:space-y-0">
                <p>© 2024 Payless4Tech. All rights reserved</p>
                <div className="items-center text-center flex flex-col md:flex-row gap-1">
                    <Link href="/privacy-policy" className="hover:underline">
                        Privacy Policy
                    </Link>
                    <div className="hidden md:block bg-gray-700 h-2 w-2 rounded-full"/>
                    <Link href="/terms" className="hover:underline">
                        Terms & Conditions
                    </Link>     
                </div>
                <p>Developed by Leadhason</p>
            </div>
        </footer>
    );
};

export default Footer;
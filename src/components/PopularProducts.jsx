import React from 'react'
import Image from 'next/image'
import PopularProductsCarousel from './PopularProductsCarousel'

const PopularProducts = () => {
  return (
    <div className="flex flex-col mt-10 mx-2 p-5 mb-24">
       <div className="flex justify-between p-3">
            <h1 className="font-weight-500 text-4xl">Popular Products</h1>
            <button className="flex gap-1 text-gray-500 hover:text-gray-800 p-2">
                View All
                <Image
                    src="/arrow-right-black.svg"
                    alt="arrow-right"
                    width={20}
                    height={20}
                    className="pt-1"
                />
            </button>
       </div>
       <hr className="w-full bg-gray-500"/>

       <PopularProductsCarousel />
    </div>
  )
}

export default PopularProducts
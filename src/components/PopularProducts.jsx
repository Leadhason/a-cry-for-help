'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { client } from "../lib/sanityClient"

const getPopularProducts = async () => {
  const popularProductsQuery = `*[_type == "product" && "Popular" in tags] {
    _id,
    name,
    image,
    price,
    slug,
  }`
  const products = await client.fetch(popularProductsQuery)
  return products
}

const CustomSkeleton = () => {
  return (
    <div className="flex flex-col mt-10 mx-2 p-5 mb-24 z-0 animate-pulse">
      <div className="flex justify-between p-2">
        <h1 className="font-weight-500 text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-0">Popular Products</h1>
        <Link href="/shop">
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
        </Link>
      </div>
      <hr className="w-full bg-gray-300 my-4"/>
      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-16px)] lg:w-[280px]">
            <div className="bg-gray-200 h-[380px] w-full rounded-md"></div>
            <div className="space-y-2 mt-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PopularProductsContent = ({ products }) => {
  const DynamicPopularProductsCarousel = dynamic(() => import('./PopularProductsCarousel'), {
    loading: () => <CustomSkeleton />,
    ssr: false
  })

  return (
    <div className="flex flex-col mt-10 mx-2 p-5 mb-24 z-0">
      <div className="flex justify-between p-3">
        <h1 className="font-weight-500 text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-0">Popular Products</h1>
        <div>
          <Link href="/shop">
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
          </Link>
        </div>
      </div>
      <hr className="w-full bg-gray-500"/>

      <DynamicPopularProductsCarousel products={products} />
    </div>
  )
}

const PopularProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const popularProducts = await getPopularProducts()
      setProducts(popularProducts)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <CustomSkeleton />
  }

  return <PopularProductsContent products={products} />
}

export default PopularProducts
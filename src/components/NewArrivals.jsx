'use client';

import { client, urlFor } from "../lib/sanityClient";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useStateContext } from "@/lib/StateContext";

const getNewArrivals = async () => {
  const NewArrivalsQuery = `*[_type == "product" && "New" in tags][0...8] {
    _id,
    name,
    image,
    price,
    slug,
  }`;
  const products = await client.fetch(NewArrivalsQuery);
  return products;
};

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const { onAdd, Qty } = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      const newArrivals = await getNewArrivals();
      setProducts(newArrivals);
    };
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col mx-2 p-5 mt-10 mb-20 z-0">
      <div className="flex justify-between p-3">
        <h1 className="font-weight-500 text-4xl">New Arrivals</h1>
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
      <hr className="w-full bg-gray-500"/>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 mt-6">
        {products.map((product) => (
          <div key={product._id} className="flex flex-col bg-transparent shadow-md w-full">
            <Link href={`/shop/${product.slug.current}`}>
              <div className="bg-white w-full aspect-square rounded-md overflow-hidden">
                {product.image ? (
                  <Image
                    src={urlFor(product.image[0]).url()}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain p-4 hover:scale-105 duration-200"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col text-sm space-y-1 mt-4 p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="font-extralight">GHS {product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewArrivals
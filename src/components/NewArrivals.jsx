
'use client';

import {client, urlFor} from "../lib/sanityClient";
import React, { useState, useEffect } from "react";
import Image from 'next/image'


const getNewArrivals = async () => {
    const NewArrivalsQuery = `*[_type == "products" && position == "New Arrivals"]{
      _id,
      name,
      image,
      price,
    }`;
    const products = await client.fetch(NewArrivalsQuery);
    return products;
  };
  
const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newArrivals = await getNewArrivals();
      setProducts(newArrivals);
    };
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col mt-8 mx-2 p-5 mt-10 mb-20">
       <div className="flex justify-between p-3">
            <h1 className="font-weight-500 text-4xl">New Arrivals</h1>
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

        <div className="grid grid-cols-4">
            {products.map((product) => (
                <div className="mt-3 flex items-center p-2">
                    <div key={product._id} className="flex flex-col bg-transparent showdow-lg justify-center place-content-center max-w-[330px] max-h-[520px] p-2">
                    <div className="bg-white h-[380px] w-[280px] place-content-center rounded-md">
                        <Image
                        src={urlFor(product.image).url()}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="object-contain p-1"
                        />
                    </div>
                    <div className="text-sm space-y-2 text-left mt-4">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="font-extralight">GHS { product.price}</p>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NewArrivals

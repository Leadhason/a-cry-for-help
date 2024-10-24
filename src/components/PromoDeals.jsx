'use client';

import React from 'react'
import {client, urlFor} from "../lib/sanityClient";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';


const getPromoDeals = async () => {
    const promoDealsQuery = `*[_type == "promoDeals"]{
        _id,
        title,
        image,
        discount,
    }`;
    const products = await client.fetch(promoDealsQuery);
    return products;
  };

const PromoDeals = () => {
    const [promoDeals, setPromoDeals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const promoDeals = await getPromoDeals();
            setPromoDeals(promoDeals);
        };
        fetchData();
    }, []);

    const colors = ["bg-blue-100", "bg-red-200", "bg-green-100"];

  return (
    <div className="grid grid-cols-3 gap-x-6 p-2 mx-8 mt-20 mb-20">
        {promoDeals.map((promoDeal, index) => (
            <div key={promoDeal._id} className={`flex flex-col p-6 h-auto rounded-md ${colors[index % colors.length]}`}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col space-y-1">
                <p className="text-sm underline text-gray-900">{promoDeal.discount} discount</p>
                <h3 className="text-lg font-medium text-black">{promoDeal.title}</h3>
                </div>
                <div className="h-[150px] w-[300px]">
                    <Image
                        src={urlFor(promoDeal.image).url()}
                        alt={promoDeal.title}
                        width={200}
                        height={200}
                        className="object-contain ml-8 mb-7 -mt-3 hover:scale-75 duration-200"
                    />
                </div>
            </div>
            <div className="flex justify-between mt-5">
                <button className="bg-black w-[90px] text-white p-2 rounded-md hover:bg-transparent hover:text-black duration-200 text-sm">
                Shop Now
                </button>
            </div>
            </div>
        ))}
    </div>
  )
}

export default PromoDeals
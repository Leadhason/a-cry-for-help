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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 sm:mx-6 lg:mx-10 mt-10 sm:mt-20 mb-10 sm:mb-20 z-0">
            {promoDeals.map((promoDeal, index) => (
                <div key={promoDeal._id} className={`flex flex-col p-4 sm:p-6 h-auto rounded-md ${colors[index % colors.length]}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex flex-col space-y-1 mb-4 sm:mb-0">
                            <p className="text-sm underline text-gray-900">{promoDeal.discount} discount</p>
                            <h3 className="text-lg font-medium text-black">{promoDeal.title}</h3>
                        </div>
                        <div className="h-[150px] w-full sm:w-[300px]">
                            <Image
                                src={urlFor(promoDeal.image).url()}
                                alt={promoDeal.title}
                                width={200}
                                height={200}
                                className="object-contain w-full h-full sm:ml-8 sm:mb-7 sm:-mt-3 hover:scale-95 duration-150"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-5">
                        <button className="flex w-full sm:w-[200px] text-black p-2 rounded-md hover:bg-opacity-80 duration-150 text-sm">
                            Shop Now
                            <Image
                                src="/arrow-right-black.svg"
                                alt="arrow-right"
                                width={20}
                                height={20}
                                className="object-contain ml-2"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PromoDeals
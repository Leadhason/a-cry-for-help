import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client, urlFor } from "../lib/sanityClient";

const getPromoDeals = async () => {
  const promoDealsQuery = `*[_type == "promoDeals"]{
    _id,
    name,
    image,
    price,
  }`;
  const promoDeals = await client.fetch(promoDealsQuery);
  return promoDeals;
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

  return (
    <div className="">
      {promoDeals.map((promoDeal) => (
        <div
          key={promoDeal._id}
          className="flex flex-col bg-transparent shadow-lg justify-center rounded-none place-content-center max-w-[330px] max-h-[520px] p-2"
        >
          <div className="bg-gray-100 h-[320px] w-[250px] place-content-center">
            <Image
              src={urlFor(promoDeal.image).url()}
              alt={promoDeal.name}
              width={500}
              height={500}
              className="object-contain p-2"
            />
          </div>
          <div className="text-small space-y-1 text-left mt-2">
            <h3 className="font-semibold">{promoDeal.name}</h3>
            <p className="font-extralight">GHS {promoDeal.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoDeals;
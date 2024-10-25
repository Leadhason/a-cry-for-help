'use client';

import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

const getAllProducts = async () => {
  const AllProductsQuery = `*[_type == "products"]{
    _id,
    name,
    image,
    price,
  }`;
  const products = await client.fetch(AllProductsQuery);
  return products;
};

const ShopPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col mt-8 mx-2 p-5 mt-10 mb-20">
      <div className="flex justify-between p-3">
        <h1 className="font-weight-500 text-4xl">All Products</h1>
      </div>
      <hr className="w-full bg-gray-500" />

      <div className="grid grid-cols-4">
        {products.map((product) => (
          <div key={product._id} className="mt-3 flex items-center p-2">
            <div className="flex flex-col bg-transparent shadow-lg justify-center place-content-center max-w-[330px] max-h-[520px] p-2">
              <div className="bg-white h-[380px] w-[280px] place-content-center rounded-md">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain p-1"
                />
              </div>
              <div className="text-sm space-y-1 text-left mt-2">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="font-extralight">GHS {product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;

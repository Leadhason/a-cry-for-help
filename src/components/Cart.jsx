import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '@/lib/StateContext';
import { client, urlFor } from '@/lib/sanityClient';
import Image from 'next/image';

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, CartItems, setshowCart, toggleCartItemsQty, onRemove } = useStateContext();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity >= 0) {
            toggleCartItemsQty(productId, newQuantity);
        }
    };

    return (
        <div className="fixed top-0 right-0 w-screen h-screen bg-black/50 z-[100] transition-all duration-1000 ease-in-out" ref={cartRef}>
            <div className="h-screen w-[470px] bg-white float-right p-3 pr-2 relative">
                <button
                    type="button"
                    className="flex items-center text-[18px] font-medium cursor-pointer gap-1"
                    onClick={() => setshowCart(false)}
                >
                    <AiOutlineLeft />
                    <span>Your Cart</span>
                    <span className="text-[#fc966d]">({totalQuantities} Items)</span>
                </button>

                {CartItems.length < 1 && (
                    <div className="flex flex-col mx-5 mt-20 py-12 items-center gap-y-3 w-full h-auto">
                        <AiOutlineShopping size={150} />
                        <h3 className="text-xl text-gray-300">Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setshowCart(false)}
                                className="text-black/75 bg-transparent rounded-md border border-black p-2 hover:bg-black hover:text-white"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="relative mt-3 p-2 overflow-y-auto h-[70%] space-y-3">
                    {CartItems.length >= 1 && CartItems.map((product) => (
                        <div className="flex gap-3 p-2 items-center ml-2" key={product._id}>
                            {product?.image && product.image.length > 0 ? (
                                <div className="bg-transparent">
                                    <Image 
                                        src={urlFor(product.image[0]).url()}
                                        alt={product.name}
                                        width={150}
                                        height={120}
                                        className="object-contain p-1 rounded-sm bg-transparent"
                                    />
                                </div>
                            ) : (
                                <div className="w-[150px] h-[120px] flex text-center items-center justify-center bg-gray-200">
                                    <span>No Image Available</span>
                                </div>
                            )}

                            <div className="flex gap-4 w-[300px] h-[120px] justify-between"> 
                                <div className="space-y-3 w-full">
                                    <div className="flex flex-col w-full space-y-1">
                                        <h5 className="font-semibold text-wrap">{product.name}</h5>
                                        <h4 className="text-sm text-gray-500">GHS {product.price}</h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onRemove(product)}
                                        className="text-xs text-red-500 underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                                
                                <div className="flex items-center bg-gray-100 w-20 border border-gray-200 h-9 text-xs mt-5 rounded-sm">
                                    <button
                                        type="button"
                                        className="w-1/3 h-full flex items-center justify-center"
                                        onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                                    >
                                        <AiOutlineMinus />
                                    </button>
                                    <span className="bg-transparent h-full text-center p-2 outline-none">{product.quantity}</span>
                                    <button
                                        type="button"
                                        className="w-1/3 h-full flex items-center justify-center"
                                        onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {CartItems.length >= 1 && (
                    <div className="absolute bottom-0 w-full p-4 bg-white border-t">
                        <div className="mx-5">
                            <div className="flex justify-between text-sm mb-3">
                                <h3>Subtotal</h3>
                                <h3>GHS {totalPrice}</h3>
                            </div>
                            <div className="w-full">
                                <Link href="/checkout">
                                    <button
                                        type="button"
                                        className="w-full text-sm text-white bg-black rounded-md py-2 hover:bg-gray-800"
                                    >
                                        Continue to Checkout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
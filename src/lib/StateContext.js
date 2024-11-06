'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Context = createContext();

export const StateContextProvider = ({ children }) => {
    const [showCart, setshowCart] = useState(false);
    const [CartItems, setCartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantities, settotalQuantities] = useState(0);
    const [Qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const isProductInCart = CartItems.find((items) => items._id === product._id);

        settotalPrice((prevtotalPrice) => prevtotalPrice + product.price * quantity);
        settotalQuantities((prevtotalQuantities) => prevtotalQuantities + quantity);

        if (isProductInCart) {
            const updatedCartItems = CartItems.map((cartproduct) => {
                if (cartproduct._id === product._id) {
                    return {
                        ...cartproduct,
                        quantity: cartproduct.quantity + quantity,
                    };
                }
                return cartproduct;
            });

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...CartItems, { ...product }]);
        }
        toast.success(`${quantity} items added to cart`);
    };

    const onRemove = (product) => {
        foundProduct = CartItems.find((item) => item._id === product._id);
        const newCartItems = CartItems.filter((item) => item._id !== product._id);

        settotalPrice((prevtotalPrice) => prevtotalPrice - foundProduct.price * foundProduct.quantity);
        settotalQuantities((prevtotalQuantities) => prevtotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    };

    const toggleCartItemsQty = (id, newQuantity) => {
        foundProduct = CartItems.find((item) => item._id === id);
        index = CartItems.findIndex((product) => product._id === id);

        if (foundProduct) {
            const quantityDifference = newQuantity - foundProduct.quantity;
            const updatedCartItems = [...CartItems];
            updatedCartItems[index] = { ...foundProduct, quantity: newQuantity };

            setCartItems(updatedCartItems);
            settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price * quantityDifference);
            settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantityDifference);
        }
    };
  
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    return (
        <Context.Provider 
            value={{
                showCart,
                setshowCart,
                CartItems,
                totalPrice,
                totalQuantities,
                Qty,
                setQty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemsQty,
                onRemove,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);
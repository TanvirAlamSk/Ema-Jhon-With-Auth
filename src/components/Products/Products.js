import React, { useEffect, useState } from 'react';
import Product from './Product/Product';
import Cart from './Cart/Cart';
import { json } from 'react-router-dom';

const Products = () => {
    const [products, setProduct] = useState([])
    const [cartItem, setCartItem] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products').then(response => response.json())
            .then(data => setProduct(data))
    }, [])


    const handelCart = (product) => {

        let cart = []
        const selectItem = cartItem.find(item => item.id == product._id)
        if (!selectItem) {
            product.quantity = 1
            cart = [...cartItem, product]
            // setCartItem(cart)
        } else {
            const rest = cartItem.filter(item => item.id != product._id)
            product.quantity = product.quantity + 1
            cart = [...rest, selectItem]

        }
        setCartItem(cart)

        //set item in local storage
        let shoppingCart = {}

        const remain = localStorage.getItem('shopping-cart')
        if (remain) {
            shoppingCart = JSON.parse(remain)
        }
        const addProduct = shoppingCart[product._id]
        if (addProduct) {
            shoppingCart[product._id] = JSON.parse(addProduct) + 1
        } else {
            shoppingCart[product._id] = 1
        }
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart))

    }

    //get item from local storage
    useEffect(() => {
        let getShoppingCart = {}
        const remainItem = []
        const checkRemain = localStorage.getItem('shopping-cart')
        if (checkRemain) {
            getShoppingCart = JSON.parse(checkRemain)
        }
        for (const id in getShoppingCart) {
            const items = products.find(product => product._id == id)
            if (items) {
                items.quantity = parseInt(getShoppingCart[id])
                remainItem.push(items)
            }
        }
        setCartItem(remainItem)
    }, [products])



    const handleClearCart = () => {
        setCartItem([])
        localStorage.clear()
    }
    return (
        <div className='products flex '>
            <div className='w-3/4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16 mt-5'>
                {products.map((product, i) => <Product key={i} product={product}
                    handelCart={handelCart}></Product>)}
            </div>
            <div className='w-1/4 h-full py-5 px-10 bg-orange-300 sticky top-0'>
                <Cart cartItem={cartItem} handleClearCart={handleClearCart}></Cart>
            </div>
        </div>
    );
};

export default Products;
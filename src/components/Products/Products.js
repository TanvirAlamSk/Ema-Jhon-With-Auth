import React, { useEffect, useState } from 'react';
import Product from './Product/Product';
import Cart from './Cart/Cart';
import { json, useLoaderData } from 'react-router-dom';

const Products = () => {
    const [products, setProduct] = useState([])
    const [cartItem, setCartItem] = useState([]);
    const [currentPage, setCurrentPage] = useState(0)
    const [allProduct, setAllProduct] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:5000/allproduct?currentpage=${currentPage}`)
            .then((responce) => responce.json())
            .then((data) => {
                setAllProduct(data.allProduct);
                setCount(data.count);
            })

    }, [currentPage])


    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then((data) => setProduct(data))
    }, [])

    const pages = Math.ceil(count / 16)

    const handelPage = (page) => {
        setCurrentPage(page);


    }


    const handelCart = (product) => {

        let cart = []
        const selectItem = cartItem.find(item => item.id == product._id)
        if (!selectItem) {
            product.quantity = 1
            cart = [...cartItem, product]
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

            <div className='w-3/4 px-16 mt-5'>
                <div className='grid gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        allProduct.map((product, i) => <Product key={i} product={product}
                            handelCart={handelCart}></Product>)
                    }
                </div>
                <div>
                    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
                        <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer">
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {/* <p className="text-sm ml-3 font-medium leading-none ">Previous</p> */}
                            </div>
                            <div className="sm:flex hidden">

                                {
                                    [...Array(pages).keys()].map((no) => <button
                                        onClick={() => handelPage(no)}
                                        key={no} className={`${no === currentPage ? ' text-indigo-700 text-lg' : "text-sm"}  font-bold  leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2`}>
                                        <span ></span>{no + 1}</button>)
                                }


                                {/* <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">3</p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-indigo-700 dark:text-indigo-400 border-t border-indigo-400 pt-3 mr-4 px-2">4</p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">5</p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">6</p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">7</p>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200  hover:text-indigo-700 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">8</p> */}
                            </div>


                            <div className="flex items-center pt-3 text-gray-600 dark:text-gray-200  hover:text-indigo-700 cursor-pointer">
                                {/* <p className="text-sm font-medium leading-none mr-3">Next</p> */}
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>






            <div className='w-1/4 h-full py-5 px-10 bg-orange-300 sticky top-0'>
                <Cart cartItem={cartItem} handleClearCart={handleClearCart}></Cart>
            </div>
        </div>
    );
};

export default Products;
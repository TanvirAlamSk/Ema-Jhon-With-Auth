import React, { useState } from 'react';
import './OrderReviewCart.css'
import { useLoaderData } from 'react-router-dom';
import OrderReviewItem from './OrderReviewItem/OrderReviewItem';
import OrderReviewCart from './OrderReviewCart/OrderReviewCart';

const OrderReview = () => {
    const products = useLoaderData()
    const [items, setItems] = useState([])

    useState(() => {
        let orderCart = {}
        let orderItem = []
        const remainItems = localStorage.getItem('shopping-cart')
        if (remainItems) {
            orderCart = JSON.parse(remainItems)
        }
        for (let element in orderCart) {
            const exisit = products.find(product => product._id == element)
            if (exisit) {
                exisit.quantity = orderCart[element]
                orderItem.push(exisit)
            }
        }
        setItems(orderItem)
    }, [])

    const handleClearCart = () => {
        setItems([])
        localStorage.clear()
    }

    const handleDeleteItem = (priductId) => {
        let orderCart = {}
        const collectItem = localStorage.getItem('shopping-cart')
        if (collectItem) {
            orderCart = JSON.parse(collectItem)
        }
        for (let id in orderCart) {
            if (priductId == id) {
                delete orderCart[priductId]
                localStorage.setItem('shopping-cart', JSON.stringify(orderCart))
                const rest = items.filter(item => item.id != priductId)
                setItems(rest)
            }
        }

    }

    return (
        <div>
            <div className='products flex mx-16'>
                <div className='w-3/4 h-full grid grid-cols-1 gap-4 mt-28'>
                    {items.map(orderData => <OrderReviewItem
                        key={orderData._id}
                        orderData={orderData}
                        handleDeleteItem={handleDeleteItem}
                    ></OrderReviewItem>)}
                </div>
                <div className='w-1/4 order-review-cart mt-20 p-4 mr-4 py-5 bg-orange-300  sticky top-0'>
                    <OrderReviewCart
                        handleClearCart={handleClearCart}
                        ordersData={items}
                    >
                    </OrderReviewCart>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;
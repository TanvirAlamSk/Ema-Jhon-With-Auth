import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid'

const OrderReviewItem = ({ orderData, handleDeleteItem }) => {
    const { _id, name, price, img, shipping, quantity } = orderData
    return (
        <div>
            <div className="flex justify-between items-center mr-40 px-4 bg-base-100 shadow-xl rounded-md">
                <div className='flex items-center'>
                    <figure>
                        <img className='w-24 m-2 rounded-md' src={img} alt="Movie" />
                    </figure>
                    <div className="mx-0">
                        <h2 className="font-semibold py-0">{name}</h2>
                        <p className='text-sm py-0"'>Price : {price}</p>
                        <p className='text-sm py-0"'>Shipping : {shipping}</p>
                        <p className='text-sm py-0"'>Quantity : {quantity}</p>
                    </div>
                </div>
                <div className="">
                    <button className="btn btn-warning"
                        onClick={() => handleDeleteItem(_id)}>
                        <TrashIcon className="h-6 w-6 text-red-500" /></button>
                </div>
            </div>
        </div>
    );
};

export default OrderReviewItem;